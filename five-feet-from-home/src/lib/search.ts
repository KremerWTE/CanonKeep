import { PrismaClient } from '@prisma/client';
import type { SearchResult, SearchFilters, EntityType } from '@/types';

/**
 * Full-text search across all entity types
 */
export async function search(
  prisma: PrismaClient,
  query: string,
  filters: SearchFilters = {}
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const projectId = filters.projectId;
  const searchLower = query.toLowerCase();

  // Helper to check if text matches
  const matches = (text: string | null): boolean => {
    if (!text) return false;
    return text.toLowerCase().includes(searchLower);
  };

  // Helper to get matched text snippet
  const getSnippet = (text: string | null, maxLen: number = 100): string => {
    if (!text) return '';
    const lower = text.toLowerCase();
    const idx = lower.indexOf(searchLower);
    if (idx === -1) return text.slice(0, maxLen);

    const start = Math.max(0, idx - 30);
    const end = Math.min(text.length, idx + query.length + 70);
    let snippet = text.slice(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    return snippet;
  };

  const shouldSearch = (type: EntityType): boolean => {
    if (!filters.entityTypes || filters.entityTypes.length === 0) return true;
    return filters.entityTypes.includes(type);
  };

  // Search characters
  if (shouldSearch('character')) {
    const characters = await prisma.character.findMany({
      where: projectId ? { projectId } : undefined,
    });

    for (const char of characters) {
      const fields = [
        { name: 'name', value: char.name },
        { name: 'background', value: char.background },
        { name: 'motivations', value: char.motivations },
        { name: 'fears', value: char.fears },
        { name: 'secrets', value: char.secrets },
        { name: 'rawNotes', value: char.rawNotes },
      ];

      for (const field of fields) {
        if (matches(field.value)) {
          results.push({
            entityType: 'character',
            entityId: char.id,
            entityName: char.name,
            matchedField: field.name,
            matchedText: getSnippet(field.value),
            score: field.name === 'name' ? 1.0 : 0.8,
          });
          break; // Only one result per entity
        }
      }
    }
  }

  // Search locations
  if (shouldSearch('location')) {
    const locations = await prisma.location.findMany({
      where: projectId ? { projectId } : undefined,
    });

    for (const loc of locations) {
      const fields = [
        { name: 'name', value: loc.name },
        { name: 'description', value: loc.description },
        { name: 'significance', value: loc.significance },
      ];

      for (const field of fields) {
        if (matches(field.value)) {
          results.push({
            entityType: 'location',
            entityId: loc.id,
            entityName: loc.name,
            matchedField: field.name,
            matchedText: getSnippet(field.value),
            score: field.name === 'name' ? 1.0 : 0.8,
          });
          break;
        }
      }
    }
  }

  // Search chapters
  if (shouldSearch('chapter')) {
    const chapters = await prisma.chapter.findMany({
      where: projectId ? { projectId } : undefined,
    });

    for (const chapter of chapters) {
      const fields = [
        { name: 'title', value: chapter.title },
        { name: 'synopsis', value: chapter.synopsis },
        { name: 'draftText', value: chapter.draftText },
      ];

      for (const field of fields) {
        if (matches(field.value)) {
          results.push({
            entityType: 'chapter',
            entityId: chapter.id,
            entityName: chapter.title || `Chapter ${chapter.number}`,
            matchedField: field.name,
            matchedText: getSnippet(field.value),
            score: field.name === 'title' ? 1.0 : 0.7,
          });
          break;
        }
      }
    }
  }

  // Search plot threads
  if (shouldSearch('plotThread')) {
    const plots = await prisma.plotThread.findMany({
      where: projectId ? { projectId } : undefined,
    });

    for (const plot of plots) {
      const fields = [
        { name: 'name', value: plot.name },
        { name: 'premise', value: plot.premise },
        { name: 'stakes', value: plot.stakes },
      ];

      for (const field of fields) {
        if (matches(field.value)) {
          results.push({
            entityType: 'plotThread',
            entityId: plot.id,
            entityName: plot.name,
            matchedField: field.name,
            matchedText: getSnippet(field.value),
            score: field.name === 'name' ? 1.0 : 0.8,
          });
          break;
        }
      }
    }
  }

  // Search events
  if (shouldSearch('event')) {
    const events = await prisma.event.findMany({
      where: projectId ? { projectId } : undefined,
    });

    for (const event of events) {
      const fields = [
        { name: 'name', value: event.name },
        { name: 'description', value: event.description },
      ];

      for (const field of fields) {
        if (matches(field.value)) {
          results.push({
            entityType: 'event',
            entityId: event.id,
            entityName: event.name,
            matchedField: field.name,
            matchedText: getSnippet(field.value),
            score: field.name === 'name' ? 1.0 : 0.8,
          });
          break;
        }
      }
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}
