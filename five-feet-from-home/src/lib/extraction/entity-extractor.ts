import type {
  ParsedBlock,
  ExtractedEntity,
  SectionClassification,
  EntityType,
  Config,
} from '@/types';

/**
 * Entity extraction using rule-based heuristics
 */
export class EntityExtractor {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Classify a section based on its heading
   */
  classifySection(heading: string): SectionClassification {
    const normalized = heading.trim();

    // Check character patterns
    for (const pattern of this.config.extraction.characterHeadingPatterns) {
      const regex = new RegExp(pattern, 'i');
      const match = normalized.match(regex);
      if (match) {
        return {
          type: 'character',
          name: this.cleanName(match[1] || normalized),
          confidence: 0.9,
        };
      }
    }

    // Check chapter patterns
    for (const pattern of this.config.extraction.chapterHeadingPatterns) {
      const regex = new RegExp(pattern, 'i');
      const match = normalized.match(regex);
      if (match) {
        return {
          type: 'chapter',
          name: match[2] || `Chapter ${match[1]}`,
          confidence: 0.95,
        };
      }
    }

    // Check plot patterns
    for (const pattern of this.config.extraction.plotHeadingPatterns) {
      const regex = new RegExp(pattern, 'i');
      const match = normalized.match(regex);
      if (match) {
        return {
          type: 'plotThread',
          name: this.cleanName(match[1] || normalized),
          confidence: 0.85,
        };
      }
    }

    // Check location patterns
    for (const pattern of this.config.extraction.locationHeadingPatterns) {
      const regex = new RegExp(pattern, 'i');
      const match = normalized.match(regex);
      if (match) {
        return {
          type: 'location',
          name: this.cleanName(match[1] || normalized),
          confidence: 0.85,
        };
      }
    }

    // Additional heuristics
    if (/^(timeline|events?|chronology)/i.test(normalized)) {
      return { type: 'event', confidence: 0.8 };
    }

    if (/^(faction|organization|group|guild|order)/i.test(normalized)) {
      return { type: 'faction', name: this.cleanName(normalized), confidence: 0.8 };
    }

    if (/^(scene|beat)/i.test(normalized)) {
      return { type: 'chapter', confidence: 0.7 };
    }

    if (/^(notes?|misc|other|ideas?)/i.test(normalized)) {
      return { type: 'note', confidence: 0.9 };
    }

    return { type: 'unknown', confidence: 0.0 };
  }

  /**
   * Extract entities from a list of blocks
   */
  extractEntities(blocks: ParsedBlock[]): ExtractedEntity[] {
    const entities: ExtractedEntity[] = [];
    let currentEntity: ExtractedEntity | null = null;
    let currentBlocks: number[] = [];

    for (const block of blocks) {
      // Check if this is a heading that starts a new section
      if (block.styleType === 'heading' && block.headingLevel && block.headingLevel <= 3) {
        // Save previous entity if exists
        if (currentEntity && currentBlocks.length > 0) {
          currentEntity.sourceBlocks = currentBlocks;
          entities.push(currentEntity);
        }

        // Classify the new section
        const classification = this.classifySection(block.rawText);

        if (classification.type !== 'unknown') {
          currentEntity = {
            type: classification.type,
            name: classification.name || block.rawText,
            confidence: classification.confidence,
            fields: {},
            sourceBlocks: [],
          };
          currentBlocks = [block.blockIndex];
        } else {
          currentEntity = null;
          currentBlocks = [];
        }
      } else if (currentEntity) {
        // Add block to current entity and extract fields
        currentBlocks.push(block.blockIndex);
        this.extractFieldsFromBlock(block, currentEntity);
      }
    }

    // Don't forget the last entity
    if (currentEntity && currentBlocks.length > 0) {
      currentEntity.sourceBlocks = currentBlocks;
      entities.push(currentEntity);
    }

    // Also try to extract standalone entities from paragraphs
    const standaloneEntities = this.extractStandaloneEntities(blocks);
    entities.push(...standaloneEntities);

    return this.deduplicateEntities(entities);
  }

  /**
   * Extract field values from a block
   */
  private extractFieldsFromBlock(block: ParsedBlock, entity: ExtractedEntity): void {
    const text = block.rawText;
    const lines = text.split('\n');

    for (const line of lines) {
      // Check each field pattern
      for (const [fieldName, pattern] of Object.entries(this.config.extraction.fieldPatterns)) {
        const regex = new RegExp(pattern, 'i');
        const match = line.match(regex);
        if (match) {
          entity.fields[fieldName] = match[1].trim();
        }
      }

      // Also check for colon-separated fields
      const colonMatch = line.match(/^([A-Za-z\s]+):\s*(.+)$/);
      if (colonMatch) {
        const key = this.normalizeFieldName(colonMatch[1]);
        const value = colonMatch[2].trim();
        if (!entity.fields[key]) {
          entity.fields[key] = value;
        }
      }
    }

    // If this is a list or paragraph without explicit fields, add to rawNotes
    if (block.styleType === 'list' || block.styleType === 'paragraph') {
      const hasExplicitFields = Object.keys(entity.fields).length > 0;
      if (!hasExplicitFields) {
        entity.fields.rawNotes = (entity.fields.rawNotes || '') + '\n' + text;
      }
    }
  }

  /**
   * Extract standalone entities not in clear sections
   */
  private extractStandaloneEntities(blocks: ParsedBlock[]): ExtractedEntity[] {
    const entities: ExtractedEntity[] = [];

    for (const block of blocks) {
      // Skip if already in a section
      if (block.sectionHeading) continue;

      // Look for inline entity definitions
      // Pattern: "Character Name — Description" or "Character Name: Description"
      const charMatch = block.rawText.match(
        /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*[—:-]\s*(.+)$/
      );

      if (charMatch && block.styleType === 'paragraph') {
        const name = charMatch[1].trim();
        const description = charMatch[2].trim();

        // Check if description contains character-like words
        if (
          /protagonist|antagonist|character|hero|villain|mentor|sidekick/i.test(description) ||
          /years?\s+old|age\s+\d+/i.test(description)
        ) {
          entities.push({
            type: 'character',
            name,
            confidence: 0.6,
            fields: { background: description },
            sourceBlocks: [block.blockIndex],
          });
        }
      }
    }

    return entities;
  }

  /**
   * Deduplicate entities by name
   */
  private deduplicateEntities(entities: ExtractedEntity[]): ExtractedEntity[] {
    const seen = new Map<string, ExtractedEntity>();

    for (const entity of entities) {
      const key = `${entity.type}:${entity.name.toLowerCase()}`;

      if (seen.has(key)) {
        // Merge with existing
        const existing = seen.get(key)!;
        existing.sourceBlocks.push(...entity.sourceBlocks);
        existing.confidence = Math.max(existing.confidence, entity.confidence);

        // Merge fields
        for (const [field, value] of Object.entries(entity.fields)) {
          if (!existing.fields[field]) {
            existing.fields[field] = value;
          } else if (field === 'rawNotes') {
            existing.fields[field] += '\n' + value;
          }
        }
      } else {
        seen.set(key, { ...entity });
      }
    }

    return Array.from(seen.values());
  }

  /**
   * Clean and normalize entity names
   */
  private cleanName(name: string): string {
    let cleaned = name.trim();

    // Remove common prefixes
    cleaned = cleaned.replace(/^(Character|Location|Plot(\s*Thread)?|Scene|Chapter):\s*/i, '');

    // Apply title case if configured
    if (this.config.namingRules.titleCase) {
      cleaned = cleaned
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    // Strip punctuation if configured
    if (this.config.namingRules.stripPunctuation) {
      cleaned = cleaned.replace(/[.,!?;:]+$/, '');
    }

    return cleaned;
  }

  /**
   * Normalize field names
   */
  private normalizeFieldName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '');
  }
}

/**
 * Extract character names mentioned in text
 */
export function extractMentionedCharacters(
  text: string,
  knownCharacters: string[]
): { name: string; count: number }[] {
  const mentions: Map<string, number> = new Map();

  for (const character of knownCharacters) {
    // Create regex to match character name (case insensitive, word boundary)
    const regex = new RegExp(`\\b${escapeRegex(character)}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      mentions.set(character, matches.length);
    }
  }

  return Array.from(mentions.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Extract relationships from text
 */
export function extractRelationships(
  text: string,
  knownCharacters: string[]
): { from: string; to: string; type: string; confidence: number }[] {
  const relationships: { from: string; to: string; type: string; confidence: number }[] = [];

  const relationshipPatterns = [
    { pattern: /(\w+)\s+is\s+(\w+)'s\s+(brother|sister|sibling|mother|father|parent|child|son|daughter)/gi, type: 'family' },
    { pattern: /(\w+)\s+and\s+(\w+)\s+are\s+(siblings|married|engaged|dating|enemies|rivals|friends|allies)/gi, type: 'mutual' },
    { pattern: /(\w+)\s+(loves|hates|fears|trusts|distrusts|respects|mentors)\s+(\w+)/gi, type: 'emotional' },
    { pattern: /(\w+)'s\s+(mentor|student|apprentice|rival|enemy|lover|spouse|partner)\s+is\s+(\w+)/gi, type: 'role' },
  ];

  for (const { pattern, type } of relationshipPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const name1 = match[1];
      const name2 = match[type === 'mutual' ? 2 : 3];
      const relType = match[type === 'mutual' ? 3 : 2];

      // Check if names match known characters
      const char1 = knownCharacters.find(c => c.toLowerCase() === name1.toLowerCase());
      const char2 = knownCharacters.find(c => c.toLowerCase() === name2.toLowerCase());

      if (char1 && char2) {
        relationships.push({
          from: char1,
          to: char2,
          type: relType.toLowerCase(),
          confidence: 0.8,
        });
      }
    }
  }

  return relationships;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
