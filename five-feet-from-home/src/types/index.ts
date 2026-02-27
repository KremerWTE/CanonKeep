// ============================================
// Configuration Types
// ============================================

export interface Config {
  defaultProject: string;
  ingestPath: string;
  tags: {
    genres: string[];
    povStyles: string[];
    tones: string[];
    themes: string[];
  };
  extraction: {
    characterHeadingPatterns: string[];
    chapterHeadingPatterns: string[];
    plotHeadingPatterns: string[];
    locationHeadingPatterns: string[];
    fieldPatterns: Record<string, string>;
  };
  namingRules: {
    titleCase: boolean;
    stripPunctuation: boolean;
    aliasDelimiters: string[];
  };
}

// ============================================
// Ingestion Types
// ============================================

export interface ParsedBlock {
  rawText: string;
  styleType: 'heading' | 'paragraph' | 'list' | 'table';
  headingLevel?: number;
  sectionHeading?: string;
  blockIndex: number;
}

export interface ParsedDocument {
  fileName: string;
  filePath: string;
  blocks: ParsedBlock[];
  lastModified: Date;
}

export interface IngestResult {
  success: boolean;
  documentsProcessed: number;
  entitiesExtracted: {
    characters: number;
    locations: number;
    chapters: number;
    plotThreads: number;
    events: number;
    notes: number;
  };
  conflicts: number;
  errors: string[];
}

// ============================================
// Entity Extraction Types
// ============================================

export type EntityType =
  | 'character'
  | 'location'
  | 'faction'
  | 'plotThread'
  | 'event'
  | 'chapter'
  | 'note';

export interface ExtractedEntity {
  type: EntityType;
  name: string;
  confidence: number;
  fields: Record<string, string>;
  sourceBlocks: number[]; // Block indices
}

export interface SectionClassification {
  type: EntityType | 'unknown';
  name?: string;
  confidence: number;
}

// ============================================
// Relationship Types
// ============================================

export interface ExtractedRelationship {
  fromName: string;
  toName: string;
  relationshipType: string;
  confidence: number;
  sourceText: string;
}

// ============================================
// Conflict Types
// ============================================

export type ConflictType =
  | 'age_mismatch'
  | 'timeline_conflict'
  | 'relationship_conflict'
  | 'duplicate_entity'
  | 'missing_field'
  | 'dangling_reference';

export type ConflictSeverity = 'error' | 'warning' | 'info';

export interface DetectedConflict {
  type: ConflictType;
  severity: ConflictSeverity;
  description: string;
  entityTypeA: string;
  entityIdA: string;
  fieldA?: string;
  entityTypeB?: string;
  entityIdB?: string;
  fieldB?: string;
}

// ============================================
// Book Builder Types
// ============================================

export interface BookStructure {
  hook?: string;
  incitingIncident?: string;
  turn?: string;
  midpoint?: string;
  crisis?: string;
  climax?: string;
  resolution?: string;
}

export interface ChapterOutline {
  number: number;
  title?: string;
  synopsis?: string;
  beats: string[];
  linkedCharacters: string[];
  linkedPlots: string[];
  linkedEvents: string[];
}

export interface ManuscriptExport {
  title: string;
  chapters: {
    number: number;
    title?: string;
    content: string;
    provenance: string[];
  }[];
}

// ============================================
// Search Types
// ============================================

export interface SearchResult {
  entityType: EntityType;
  entityId: string;
  entityName: string;
  matchedField: string;
  matchedText: string;
  score: number;
}

export interface SearchFilters {
  entityTypes?: EntityType[];
  tags?: string[];
  projectId?: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
