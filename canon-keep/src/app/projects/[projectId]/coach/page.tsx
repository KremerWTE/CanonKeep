'use client';

import { useEffect, useState, useRef, use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Send,
  MessageCircle,
  Plus,
  Trash2,
  Loader2,
  Sparkles,
  User,
  Bot,
} from 'lucide-react';

type FeedbackMode = 'gentle' | 'professional' | 'brutal';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  title: string;
  mode: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

const MODE_CONFIG: Record<FeedbackMode, { label: string; description: string; color: string; emoji: string }> = {
  gentle: {
    label: 'Gentle',
    description: 'Encouraging and supportive',
    color: 'bg-green-500',
    emoji: '🌱',
  },
  professional: {
    label: 'Professional',
    description: 'Balanced critique',
    color: 'bg-blue-500',
    emoji: '📝',
  },
  brutal: {
    label: 'Brutal',
    description: 'Unfiltered honesty',
    color: 'bg-red-500',
    emoji: '🔥',
  },
};

export default function WritingCoachPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState<FeedbackMode>('professional');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessions();
  }, [resolvedParams.projectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`/api/projects/${resolvedParams.projectId}/chat`);
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSession = async (sessionId: string) => {
    try {
      const response = await fetch(
        `/api/projects/${resolvedParams.projectId}/chat/${sessionId}`
      );
      const data = await response.json();
      setCurrentSession(data);
      setMessages(data.messages);
      setMode(data.mode as FeedbackMode);
    } catch (error) {
      console.error('Failed to load session:', error);
    }
  };

  const startNewSession = () => {
    setCurrentSession(null);
    setMessages([]);
  };

  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/projects/${resolvedParams.projectId}/chat/${sessionId}`, {
        method: 'DELETE',
      });
      setSessions(sessions.filter((s) => s.id !== sessionId));
      if (currentSession?.id === sessionId) {
        startNewSession();
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: input,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      const response = await fetch(`/api/projects/${resolvedParams.projectId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: currentSession?.id,
          message: userMessage.content,
          mode,
        }),
      });

      const data = await response.json();

      if (!currentSession) {
        setCurrentSession({ id: data.sessionId } as ChatSession);
        await fetchSessions();
      }

      setMessages((prev) => [...prev, data.message]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/projects/${resolvedParams.projectId}`}
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Writing Coach
              </h1>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="flex items-center gap-2">
            {(Object.keys(MODE_CONFIG) as FeedbackMode[]).map((m) => {
              const config = MODE_CONFIG[m];
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  disabled={!!currentSession}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    mode === m
                      ? `${config.color} text-white`
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  } ${currentSession ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={config.description}
                >
                  {config.emoji} {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Sessions */}
        <div className="w-64 border-r border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="p-3">
            <Button onClick={startNewSession} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ) : sessions.length === 0 ? (
              <p className="text-center text-sm text-slate-500 py-4">
                No conversations yet
              </p>
            ) : (
              sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => loadSession(session.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all group ${
                    currentSession?.id === session.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            MODE_CONFIG[session.mode as FeedbackMode]?.color || 'bg-slate-400'
                          }`}
                        />
                        <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {session.title || 'New Chat'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => deleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-indigo-500" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Your AI Writing Coach
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                  Ask for feedback on your writing, brainstorm ideas, discuss craft techniques,
                  or get help with specific passages. I&apos;ll respect your established canon.
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {[
                    'How can I improve my opening hook?',
                    'Is my pacing too slow in chapter 3?',
                    'Help me develop my antagonist',
                    'Review my dialogue in this scene',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-indigo-500" />
                      </div>
                    )}
                    <div
                      className={`max-w-2xl rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </div>
                    )}
                  </div>
                ))}
                {sending && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="flex gap-3 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your writing coach anything..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ minHeight: '48px', maxHeight: '200px' }}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="h-12 w-12 rounded-xl"
              >
                {sending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              {MODE_CONFIG[mode].emoji} {MODE_CONFIG[mode].label} mode •{' '}
              {MODE_CONFIG[mode].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
