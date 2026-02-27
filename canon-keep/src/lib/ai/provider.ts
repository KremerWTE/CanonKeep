import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { z } from 'zod';

export type AIProvider = 'anthropic' | 'openai';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AICompletionOptions {
  messages: AIMessage[];
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface AIClient {
  complete(options: AICompletionOptions): Promise<string>;
  extractJSON<T>(options: AICompletionOptions, schema: z.ZodSchema<T>): Promise<T>;
  chat(options: AICompletionOptions): Promise<string>;
  streamChat(options: AICompletionOptions): AsyncIterable<string>;
}

class AnthropicClient implements AIClient {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async complete(options: AICompletionOptions): Promise<string> {
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 4096,
      system: options.systemPrompt || 'You are a helpful assistant.',
      messages: options.messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const textBlock = response.content.find(block => block.type === 'text');
    return textBlock ? textBlock.text : '';
  }

  async extractJSON<T>(options: AICompletionOptions, schema: z.ZodSchema<T>): Promise<T> {
    const systemPrompt = `${options.systemPrompt || ''}

CRITICAL: You must respond with valid JSON only. No markdown, no code blocks, no explanations.
Just raw JSON that matches the expected schema.`;

    const response = await this.complete({
      ...options,
      systemPrompt,
    });

    // Try to extract JSON from the response
    let jsonStr = response.trim();

    // Remove markdown code blocks if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    try {
      const parsed = JSON.parse(jsonStr);
      return schema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', jsonStr);
      throw new Error(`Failed to parse AI response as JSON: ${error}`);
    }
  }

  async chat(options: AICompletionOptions): Promise<string> {
    return this.complete(options);
  }

  async *streamChat(options: AICompletionOptions): AsyncIterable<string> {
    const stream = await this.client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 4096,
      system: options.systemPrompt || 'You are a helpful assistant.',
      messages: options.messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  }
}

class OpenAIClient implements AIClient {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async complete(options: AICompletionOptions): Promise<string> {
    const messages: OpenAI.ChatCompletionMessageParam[] = [];

    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }

    messages.push(...options.messages.map(m => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    })));

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 0.7,
    });

    return response.choices[0]?.message?.content || '';
  }

  async extractJSON<T>(options: AICompletionOptions, schema: z.ZodSchema<T>): Promise<T> {
    const systemPrompt = `${options.systemPrompt || ''}

CRITICAL: You must respond with valid JSON only. No markdown, no code blocks, no explanations.
Just raw JSON that matches the expected schema.`;

    const response = await this.complete({
      ...options,
      systemPrompt,
    });

    // Try to extract JSON from the response
    let jsonStr = response.trim();

    // Remove markdown code blocks if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    try {
      const parsed = JSON.parse(jsonStr);
      return schema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', jsonStr);
      throw new Error(`Failed to parse AI response as JSON: ${error}`);
    }
  }

  async chat(options: AICompletionOptions): Promise<string> {
    return this.complete(options);
  }

  async *streamChat(options: AICompletionOptions): AsyncIterable<string> {
    const messages: OpenAI.ChatCompletionMessageParam[] = [];

    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }

    messages.push(...options.messages.map(m => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
    })));

    const stream = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages,
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 0.7,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }
}

export function getAIClient(): AIClient {
  const provider = (process.env.AI_PROVIDER || 'anthropic') as AIProvider;

  if (provider === 'openai') {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required when AI_PROVIDER is set to openai');
    }
    return new OpenAIClient();
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is required when AI_PROVIDER is set to anthropic');
  }
  return new AnthropicClient();
}
