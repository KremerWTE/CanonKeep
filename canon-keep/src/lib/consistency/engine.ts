import prisma from '../db';
import { z } from 'zod';

export interface ConsistencyAlert {
  alertType: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  title: string;
  description: string;
  evidence: {
    facts: Array<{
      id: string;
      factType: string;
      factValue: string;
      chapterId?: string;
      evidence?: string;
    }>;
    mentions: Array<{
      id: string;
      chapterId: string;
      snippet: string;
    }>;
  };
  suggestedFix?: string;
}

export type AlertType =
  | 'trait_conflict'
  | 'alive_dead'
  | 'knowledge_state'
  | 'event_order'
  | 'location_description'
  | 'age_inconsistency'
  | 'timeline_conflict'
  | 'relationship_conflict';

// Check for trait conflicts (e.g., eye color changes)
async function checkTraitConflicts(projectId: string): Promise<ConsistencyAlert[]> {
  const alerts: ConsistencyAlert[] = [];

  // Get all entities with their facts
  const entities = await prisma.entity.findMany({
    where: { projectId },
    include: {
      facts: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  // Physical traits that should generally remain constant
  const immutableTraits = ['eye_color', 'hair_color', 'ethnicity', 'birth_date', 'birthplace'];

  for (const entity of entities) {
    const factsByType = new Map<string, typeof entity.facts>();

    for (const fact of entity.facts) {
      if (!factsByType.has(fact.factType)) {
        factsByType.set(fact.factType, []);
      }
      factsByType.get(fact.factType)!.push(fact);
    }

    for (const [factType, facts] of factsByType) {
      // Check if this is an immutable trait with conflicting values
      if (immutableTraits.includes(factType) && facts.length > 1) {
        const uniqueValues = new Set(facts.map(f => f.factValue.toLowerCase()));

        if (uniqueValues.size > 1) {
          alerts.push({
            alertType: 'trait_conflict',
            severity: 'high',
            confidence: 0.9,
            title: `Possible ${factType.replace('_', ' ')} inconsistency for ${entity.name}`,
            description: `${entity.name}'s ${factType.replace('_', ' ')} appears to change: ${Array.from(uniqueValues).join(' vs ')}`,
            evidence: {
              facts: facts.map(f => ({
                id: f.id,
                factType: f.factType,
                factValue: f.factValue,
                chapterId: f.chapterId || undefined,
                evidence: f.evidence || undefined,
              })),
              mentions: [],
            },
            suggestedFix: `Review the descriptions of ${entity.name}'s ${factType.replace('_', ' ')} and ensure consistency, or add an explanation for any intentional change.`,
          });
        }
      }
    }
  }

  return alerts;
}

// Check for alive/dead conflicts
async function checkAliveDeadConflicts(projectId: string): Promise<ConsistencyAlert[]> {
  const alerts: ConsistencyAlert[] = [];

  const entities = await prisma.entity.findMany({
    where: {
      projectId,
      type: 'character',
    },
    include: {
      facts: {
        where: { factType: 'status_alive' },
        orderBy: { createdAt: 'asc' },
      },
      mentions: {
        include: {
          chapter: {
            select: { id: true, title: true, orderIndex: true },
          },
        },
        orderBy: {
          chapter: { orderIndex: 'asc' },
        },
      },
    },
  });

  for (const entity of entities) {
    // Find death facts
    const deathFact = entity.facts.find(f => f.factValue.toLowerCase() === 'dead' || f.factValue.toLowerCase() === 'deceased');

    if (deathFact && deathFact.chapterId) {
      // Get the chapter order of death
      const deathChapter = await prisma.chapter.findUnique({
        where: { id: deathFact.chapterId },
        select: { orderIndex: true, title: true },
      });

      if (deathChapter) {
        // Check for mentions after death
        const mentionsAfterDeath = entity.mentions.filter(
          m => m.chapter.orderIndex > deathChapter.orderIndex
        );

        // Check if these mentions indicate the character is actively present
        const activeMentions = mentionsAfterDeath.filter(m => {
          const snippet = m.evidenceSnippet.toLowerCase();
          // Filter out mentions that are clearly references to the past
          return !snippet.includes('remembered') &&
            !snippet.includes('memory') &&
            !snippet.includes('ghost') &&
            !snippet.includes('spirit') &&
            !snippet.includes('used to') &&
            !snippet.includes('had been');
        });

        if (activeMentions.length > 0) {
          alerts.push({
            alertType: 'alive_dead',
            severity: 'high',
            confidence: 0.75,
            title: `${entity.name} appears after their death`,
            description: `${entity.name} is marked as deceased in "${deathChapter.title}" but appears to be active in ${activeMentions.length} later scene(s).`,
            evidence: {
              facts: [{
                id: deathFact.id,
                factType: deathFact.factType,
                factValue: deathFact.factValue,
                chapterId: deathFact.chapterId,
                evidence: deathFact.evidence || undefined,
              }],
              mentions: activeMentions.slice(0, 3).map(m => ({
                id: m.id,
                chapterId: m.chapterId,
                snippet: m.evidenceSnippet,
              })),
            },
            suggestedFix: `Verify if these later appearances are intentional (flashback, ghost, resurrection) or require correction.`,
          });
        }
      }
    }
  }

  return alerts;
}

// Check for timeline/event ordering conflicts
async function checkEventOrderConflicts(projectId: string): Promise<ConsistencyAlert[]> {
  const alerts: ConsistencyAlert[] = [];

  // Get all events with timeline markers
  const events = await prisma.event.findMany({
    where: {
      chapter: {
        book: { projectId },
      },
      narrativeTime: { not: null },
    },
    include: {
      chapter: {
        select: { id: true, title: true, orderIndex: true },
      },
    },
    orderBy: {
      chapter: { orderIndex: 'asc' },
    },
  });

  // Look for relative time markers that conflict
  const timeMarkers = events.map(e => ({
    event: e,
    marker: e.narrativeTime?.toLowerCase() || '',
  }));

  // Simple check for "before/after" conflicts
  for (let i = 0; i < timeMarkers.length; i++) {
    for (let j = i + 1; j < timeMarkers.length; j++) {
      const earlier = timeMarkers[i];
      const later = timeMarkers[j];

      // Check if later event claims to happen before earlier event
      if (later.marker.includes('before') && later.marker.includes(earlier.event.name.toLowerCase())) {
        alerts.push({
          alertType: 'event_order',
          severity: 'medium',
          confidence: 0.7,
          title: `Timeline inconsistency detected`,
          description: `"${later.event.name}" is described as happening before "${earlier.event.name}", but appears later in the narrative.`,
          evidence: {
            facts: [],
            mentions: [],
          },
          suggestedFix: `Review the timeline of these events and clarify the intended order.`,
        });
      }
    }
  }

  return alerts;
}

// Check for location description conflicts
async function checkLocationConflicts(projectId: string): Promise<ConsistencyAlert[]> {
  const alerts: ConsistencyAlert[] = [];

  const locations = await prisma.entity.findMany({
    where: {
      projectId,
      type: 'location',
    },
    include: {
      mentions: {
        include: {
          chapter: {
            select: { id: true, title: true, orderIndex: true },
          },
        },
      },
      facts: true,
    },
  });

  for (const location of locations) {
    // Check for conflicting descriptions in facts
    const descFacts = location.facts.filter(f =>
      f.factType === 'description' || f.factType === 'appearance'
    );

    if (descFacts.length > 1) {
      // Simple keyword-based conflict detection
      const keywords = descFacts.map(f => {
        const words = f.factValue.toLowerCase().split(/\s+/);
        return {
          fact: f,
          words: new Set(words),
        };
      });

      // Check for opposing descriptions
      const opposites = [
        ['large', 'small'],
        ['bright', 'dark'],
        ['new', 'old'],
        ['clean', 'dirty'],
        ['quiet', 'loud'],
        ['empty', 'crowded'],
        ['warm', 'cold'],
        ['modern', 'ancient'],
      ];

      for (const [word1, word2] of opposites) {
        const hasWord1 = keywords.find(k => k.words.has(word1));
        const hasWord2 = keywords.find(k => k.words.has(word2));

        if (hasWord1 && hasWord2 && hasWord1.fact.id !== hasWord2.fact.id) {
          alerts.push({
            alertType: 'location_description',
            severity: 'low',
            confidence: 0.6,
            title: `Possible description conflict for ${location.name}`,
            description: `${location.name} is described as both "${word1}" and "${word2}" in different places.`,
            evidence: {
              facts: [hasWord1.fact, hasWord2.fact].map(f => ({
                id: f.id,
                factType: f.factType,
                factValue: f.factValue,
                chapterId: f.chapterId || undefined,
                evidence: f.evidence || undefined,
              })),
              mentions: [],
            },
            suggestedFix: `This may be intentional (change over time, character perspective) or may need correction.`,
          });
        }
      }
    }
  }

  return alerts;
}

// Main function to run all consistency checks
export async function runConsistencyChecks(projectId: string): Promise<ConsistencyAlert[]> {
  const allAlerts: ConsistencyAlert[] = [];

  // Run all checks
  const [traitAlerts, aliveDeadAlerts, eventAlerts, locationAlerts] = await Promise.all([
    checkTraitConflicts(projectId),
    checkAliveDeadConflicts(projectId),
    checkEventOrderConflicts(projectId),
    checkLocationConflicts(projectId),
  ]);

  allAlerts.push(...traitAlerts);
  allAlerts.push(...aliveDeadAlerts);
  allAlerts.push(...eventAlerts);
  allAlerts.push(...locationAlerts);

  return allAlerts;
}

// Save alerts to database
export async function saveAlerts(projectId: string, alerts: ConsistencyAlert[]): Promise<void> {
  // Clear existing open alerts for this project
  await prisma.canonAlert.updateMany({
    where: {
      projectId,
      status: 'open',
    },
    data: {
      status: 'dismissed',
    },
  });

  // Create new alerts
  await prisma.canonAlert.createMany({
    data: alerts.map(alert => ({
      projectId,
      alertType: alert.alertType,
      severity: alert.severity,
      confidence: alert.confidence,
      title: alert.title,
      description: alert.description,
      evidence: JSON.stringify(alert.evidence),
      suggestedFix: alert.suggestedFix,
      status: 'open',
    })),
  });
}
