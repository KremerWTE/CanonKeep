import { z } from 'zod';
import { getAIClient } from '../ai/provider';

// Schema for extracted entities
export const EntityTypeEnum = z.enum([
  'character',
  'location',
  'event',
  'object',
  'faction',
  'theme',
]);

export type EntityType = z.infer<typeof EntityTypeEnum>;

export const ExtractedEntitySchema = z.object({
  name: z.string(),
  type: EntityTypeEnum,
  description: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  mentions: z.array(z.object({
    text: z.string(),
    startOffset: z.number(),
    endOffset: z.number(),
    context: z.string().optional(),
  })),
  attributes: z.record(z.string(), z.string()).optional(),
});

export const ExtractedRelationshipSchema = z.object({
  sourceEntity: z.string(),
  targetEntity: z.string(),
  relationType: z.string(),
  description: z.string().optional(),
  evidence: z.string(),
});

export const ExtractedEventSchema = z.object({
  name: z.string(),
  description: z.string(),
  participants: z.array(z.string()),
  location: z.string().optional(),
  narrativeTime: z.string().optional(),
  eventType: z.enum(['action', 'dialogue', 'revelation', 'flashback', 'transition', 'other']),
  evidence: z.string(),
  orderIndex: z.number(),
});

export const ExtractionResultSchema = z.object({
  entities: z.array(ExtractedEntitySchema),
  relationships: z.array(ExtractedRelationshipSchema),
  events: z.array(ExtractedEventSchema),
  facts: z.array(z.object({
    entityName: z.string(),
    factType: z.string(),
    factValue: z.string(),
    evidence: z.string(),
  })),
});

export type ExtractedEntity = z.infer<typeof ExtractedEntitySchema>;
export type ExtractedRelationship = z.infer<typeof ExtractedRelationshipSchema>;
export type ExtractedEvent = z.infer<typeof ExtractedEventSchema>;
export type ExtractionResult = z.infer<typeof ExtractionResultSchema>;

const EXTRACTION_PROMPT = `You are an expert story analyst extracting structured data from manuscript text.

Analyze the following chapter text and extract:

1. ENTITIES: Characters, locations, objects, factions, and themes mentioned
   - Include character names and any aliases/nicknames
   - Note physical descriptions, personality traits
   - Track locations with their descriptions
   - Identify significant objects and factions

2. RELATIONSHIPS: How entities relate to each other
   - Family relationships (parent_of, sibling_of, married_to)
   - Social relationships (friend_of, enemy_of, colleague_of)
   - Location relationships (lives_in, works_at, located_in)
   - Organization relationships (member_of, leader_of)

3. EVENTS: Key story events in order
   - Actions, dialogues, revelations
   - Note who participated and where
   - Track relative time markers ("the next day", "two weeks later")

4. FACTS: Specific canonical facts about entities
   - Physical attributes (eye_color, hair_color, age, height)
   - Status (alive, injured, location)
   - Relationships
   - Any concrete details that could be contradicted later

For each extraction, provide:
- The exact text evidence (quote from the manuscript)
- Character offsets where possible
- Confidence in your extraction

Be thorough but avoid over-interpretation. Only extract what is explicitly stated or very clearly implied.`;

export async function extractFromChapter(
  chapterContent: string,
  chapterTitle: string,
  existingEntities: string[] = []
): Promise<ExtractionResult> {
  const ai = getAIClient();

  const contextMessage = existingEntities.length > 0
    ? `\n\nNote: These entities have already been identified in previous chapters: ${existingEntities.join(', ')}. Link to existing entities when appropriate.`
    : '';

  const result = await ai.extractJSON(
    {
      systemPrompt: EXTRACTION_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Chapter: ${chapterTitle}

${chapterContent}${contextMessage}

Extract all entities, relationships, events, and facts from this chapter. Respond with JSON only.`,
        },
      ],
      maxTokens: 8000,
      temperature: 0.3,
    },
    ExtractionResultSchema
  );

  return result;
}

// Heuristic-based entity detection for common patterns
export function detectEntitiesHeuristic(text: string): { name: string; type: EntityType; offset: number }[] {
  const entities: { name: string; type: EntityType; offset: number }[] = [];

  // Dialogue speaker pattern: "text," Name said
  const speakerPattern = /[""][^""]+[""],?\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:said|asked|replied|whispered|shouted|muttered|exclaimed)/g;
  let match;
  while ((match = speakerPattern.exec(text)) !== null) {
    entities.push({
      name: match[1],
      type: 'character',
      offset: match.index + match[0].indexOf(match[1]),
    });
  }

  // Name said pattern: Name said, "text"
  const speakerPattern2 = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:said|asked|replied|whispered|shouted|muttered|exclaimed),?\s+[""][^""]+[""]/g;
  while ((match = speakerPattern2.exec(text)) !== null) {
    entities.push({
      name: match[1],
      type: 'character',
      offset: match.index,
    });
  }

  // Location patterns
  const locationPatterns = [
    /(?:in|at|to|from|near)\s+(?:the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:Hotel|Restaurant|Park|Building|Tower|Street|Avenue|Road|City|Town|Village|Kingdom|Castle|Palace|Forest|Mountain|River|Lake|Ocean|Sea|Island|Beach|Valley|Desert|Cave|Temple|Church|Shrine|School|University|Hospital|Prison|Station|Airport|Port|Harbor|Bridge|Dam|Factory|Farm|Ranch|Estate|Manor|Mansion|House|Apartment|Room|Hall|Chamber|Garden|Courtyard|Plaza|Square|Market|Store|Shop|Bar|Club|Theater|Arena|Stadium|Court|Office|Library|Museum|Gallery|Bank|Hotel|Inn|Tavern|Lodge|Cabin|Cottage|Shack|Hut|Tent|Camp)?)?)/g,
  ];

  for (const pattern of locationPatterns) {
    while ((match = pattern.exec(text)) !== null) {
      if (match[1] && match[1].length > 2) {
        entities.push({
          name: match[1],
          type: 'location',
          offset: match.index,
        });
      }
    }
  }

  return entities;
}

// Merge extracted entities, combining duplicates
export function mergeEntities(entities: ExtractedEntity[]): ExtractedEntity[] {
  const merged = new Map<string, ExtractedEntity>();

  for (const entity of entities) {
    const key = `${entity.name.toLowerCase()}-${entity.type}`;
    const existing = merged.get(key);

    if (existing) {
      // Merge mentions
      existing.mentions = [...existing.mentions, ...entity.mentions];

      // Merge aliases
      if (entity.aliases) {
        existing.aliases = [...(existing.aliases || []), ...entity.aliases];
        existing.aliases = [...new Set(existing.aliases)];
      }

      // Merge attributes
      if (entity.attributes) {
        existing.attributes = { ...existing.attributes, ...entity.attributes };
      }

      // Use longer description
      if (entity.description && (!existing.description || entity.description.length > existing.description.length)) {
        existing.description = entity.description;
      }
    } else {
      merged.set(key, { ...entity });
    }
  }

  return Array.from(merged.values());
}
