import { describe, it, expect } from 'vitest';
import {
  EntityExtractor,
  extractMentionedCharacters,
  extractRelationships,
} from '../src/lib/extraction/entity-extractor';
import type { Config, ParsedBlock } from '../src/types';

const testConfig: Config = {
  defaultProject: 'TEST',
  ingestPath: './ingest',
  tags: {
    genres: [],
    povStyles: [],
    tones: [],
    themes: [],
  },
  extraction: {
    characterHeadingPatterns: [
      '^Character:\\s*(.+)$',
      '^(.+)\\s*[-—]\\s*(?:Background|Profile|Bio)$',
    ],
    chapterHeadingPatterns: ['^Chapter\\s+(\\d+)(?:\\s*[-:—]\\s*(.+))?$'],
    plotHeadingPatterns: ['^Plot\\s*(?:Thread)?:\\s*(.+)$'],
    locationHeadingPatterns: ['^Location:\\s*(.+)$', '^Setting:\\s*(.+)$'],
    fieldPatterns: {
      name: '^(?:Name|Full Name):\\s*(.+)$',
      age: '^Age:\\s*(\\d+|[a-zA-Z\\s]+)$',
      motivation: '^(?:Motivation|Goal)s?:\\s*(.+)$',
      fear: '^(?:Fear)s?:\\s*(.+)$',
      secret: '^(?:Secret)s?:\\s*(.+)$',
      flaw: '^(?:Flaw|Weakness)s?:\\s*(.+)$',
      background: '^(?:Background|History):\\s*(.+)$',
    },
  },
  namingRules: {
    titleCase: true,
    stripPunctuation: false,
    aliasDelimiters: ['/', '|', ','],
  },
};

describe('EntityExtractor', () => {
  const extractor = new EntityExtractor(testConfig);

  describe('classifySection', () => {
    it('should classify character headings', () => {
      const result = extractor.classifySection('Character: Maya Chen');
      expect(result.type).toBe('character');
      expect(result.name).toBe('Maya Chen');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it('should classify character headings with dash format', () => {
      const result = extractor.classifySection('Elena Blackwood — Background');
      expect(result.type).toBe('character');
      expect(result.name).toBe('Elena Blackwood');
    });

    it('should classify chapter headings', () => {
      const result = extractor.classifySection('Chapter 1: The Beginning');
      expect(result.type).toBe('chapter');
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    it('should classify chapter headings without title', () => {
      const result = extractor.classifySection('Chapter 5');
      expect(result.type).toBe('chapter');
    });

    it('should classify plot thread headings', () => {
      const result = extractor.classifySection('Plot Thread: The Mystery');
      expect(result.type).toBe('plotThread');
      expect(result.name).toBe('The Mystery');
    });

    it('should classify location headings', () => {
      const result = extractor.classifySection('Location: The Vault');
      expect(result.type).toBe('location');
      expect(result.name).toBe('The Vault');
    });

    it('should return unknown for unrecognized headings', () => {
      const result = extractor.classifySection('Random Heading');
      expect(result.type).toBe('unknown');
      expect(result.confidence).toBe(0.0);
    });
  });

  describe('extractEntities', () => {
    it('should extract a character with fields', () => {
      const blocks: ParsedBlock[] = [
        {
          rawText: 'Character: Test Character',
          styleType: 'heading',
          headingLevel: 1,
          blockIndex: 0,
        },
        {
          rawText: 'Age: 25',
          styleType: 'paragraph',
          blockIndex: 1,
          sectionHeading: 'Character: Test Character',
        },
        {
          rawText: 'Motivation: To save the world',
          styleType: 'paragraph',
          blockIndex: 2,
          sectionHeading: 'Character: Test Character',
        },
      ];

      const entities = extractor.extractEntities(blocks);

      expect(entities.length).toBe(1);
      expect(entities[0].type).toBe('character');
      expect(entities[0].name).toBe('Test Character');
      expect(entities[0].fields.age).toBe('25');
      expect(entities[0].fields.motivation).toBe('To save the world');
    });

    it('should extract multiple entities', () => {
      const blocks: ParsedBlock[] = [
        {
          rawText: 'Character: First Character',
          styleType: 'heading',
          headingLevel: 1,
          blockIndex: 0,
        },
        {
          rawText: 'Age: 30',
          styleType: 'paragraph',
          blockIndex: 1,
          sectionHeading: 'Character: First Character',
        },
        {
          rawText: 'Location: Test Location',
          styleType: 'heading',
          headingLevel: 1,
          blockIndex: 2,
        },
        {
          rawText: 'A beautiful place',
          styleType: 'paragraph',
          blockIndex: 3,
          sectionHeading: 'Location: Test Location',
        },
      ];

      const entities = extractor.extractEntities(blocks);

      expect(entities.length).toBe(2);
      expect(entities.map((e) => e.type)).toContain('character');
      expect(entities.map((e) => e.type)).toContain('location');
    });
  });
});

describe('extractMentionedCharacters', () => {
  it('should find character mentions in text', () => {
    const text = 'Maya walked into the room. Kai was already there. Maya smiled.';
    const characters = ['Maya', 'Kai', 'Voss'];

    const mentions = extractMentionedCharacters(text, characters);

    expect(mentions.find((m) => m.name === 'Maya')?.count).toBe(2);
    expect(mentions.find((m) => m.name === 'Kai')?.count).toBe(1);
    expect(mentions.find((m) => m.name === 'Voss')).toBeUndefined();
  });

  it('should be case insensitive', () => {
    const text = 'MAYA and maya and Maya';
    const characters = ['Maya'];

    const mentions = extractMentionedCharacters(text, characters);

    expect(mentions[0].count).toBe(3);
  });
});

describe('extractRelationships', () => {
  it('should extract sibling relationships', () => {
    const text = 'Elena is Marcus\'s sister.';
    const characters = ['Elena', 'Marcus'];

    const relationships = extractRelationships(text, characters);

    expect(relationships.length).toBeGreaterThan(0);
    expect(relationships[0].from).toBe('Elena');
    expect(relationships[0].to).toBe('Marcus');
    expect(relationships[0].type).toBe('sister');
  });

  it('should handle mutual relationships', () => {
    const text = 'Maya and Kai are friends.';
    const characters = ['Maya', 'Kai'];

    const relationships = extractRelationships(text, characters);

    expect(relationships.length).toBeGreaterThan(0);
  });
});
