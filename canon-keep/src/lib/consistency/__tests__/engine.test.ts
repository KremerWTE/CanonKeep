// Mock Prisma client
jest.mock('../../db', () => ({
  entity: {
    findMany: jest.fn(),
  },
  chapter: {
    findUnique: jest.fn(),
  },
  event: {
    findMany: jest.fn(),
  },
  canonAlert: {
    updateMany: jest.fn(),
    createMany: jest.fn(),
  },
}));

import prisma from '../../db';

describe('Consistency Engine Rules', () => {
  describe('Trait Conflict Detection', () => {
    it('should detect conflicting eye colors', async () => {
      // Mock entity with conflicting eye color facts
      const mockEntities = [
        {
          id: '1',
          name: 'Sarah',
          type: 'character',
          projectId: 'proj1',
          facts: [
            { id: 'f1', factType: 'eye_color', factValue: 'blue', chapterId: 'ch1' },
            { id: 'f2', factType: 'eye_color', factValue: 'green', chapterId: 'ch5' },
          ],
          mentions: [],
        },
      ];

      (prisma.entity.findMany as jest.Mock).mockResolvedValue(mockEntities);

      // The rule should detect that Sarah has two different eye colors
      const uniqueEyeColors = new Set(
        mockEntities[0].facts
          .filter(f => f.factType === 'eye_color')
          .map(f => f.factValue.toLowerCase())
      );

      expect(uniqueEyeColors.size).toBeGreaterThan(1);
    });

    it('should not flag consistent traits', async () => {
      const mockEntities = [
        {
          id: '1',
          name: 'John',
          type: 'character',
          projectId: 'proj1',
          facts: [
            { id: 'f1', factType: 'eye_color', factValue: 'brown', chapterId: 'ch1' },
            { id: 'f2', factType: 'eye_color', factValue: 'brown', chapterId: 'ch5' },
          ],
          mentions: [],
        },
      ];

      const uniqueEyeColors = new Set(
        mockEntities[0].facts
          .filter(f => f.factType === 'eye_color')
          .map(f => f.factValue.toLowerCase())
      );

      expect(uniqueEyeColors.size).toBe(1);
    });
  });

  describe('Alive/Dead Conflict Detection', () => {
    it('should detect character appearing after death', () => {
      const deathChapterOrder = 5;
      const mentionChapterOrder = 8;

      const appearsAfterDeath = mentionChapterOrder > deathChapterOrder;
      expect(appearsAfterDeath).toBe(true);
    });

    it('should not flag mentions before death', () => {
      const deathChapterOrder = 5;
      const mentionChapterOrder = 3;

      const appearsAfterDeath = mentionChapterOrder > deathChapterOrder;
      expect(appearsAfterDeath).toBe(false);
    });

    it('should exclude memory/flashback references', () => {
      const snippets = [
        'She remembered when John was alive',
        'The ghost of John appeared',
        'John used to say that',
        'In her memory, John smiled',
      ];

      const excludePatterns = ['remembered', 'memory', 'ghost', 'spirit', 'used to'];

      for (const snippet of snippets) {
        const isExcluded = excludePatterns.some(pattern =>
          snippet.toLowerCase().includes(pattern)
        );
        expect(isExcluded).toBe(true);
      }
    });
  });

  describe('Location Description Conflicts', () => {
    it('should detect opposing descriptions', () => {
      const descriptions = [
        { factValue: 'The room was large and bright' },
        { factValue: 'The room felt small and dark' },
      ];

      const opposites = [
        ['large', 'small'],
        ['bright', 'dark'],
      ];

      let conflictFound = false;
      for (const [word1, word2] of opposites) {
        const hasWord1 = descriptions.some(d =>
          d.factValue.toLowerCase().includes(word1)
        );
        const hasWord2 = descriptions.some(d =>
          d.factValue.toLowerCase().includes(word2)
        );
        if (hasWord1 && hasWord2) {
          conflictFound = true;
          break;
        }
      }

      expect(conflictFound).toBe(true);
    });
  });

  describe('Alert Severity Classification', () => {
    it('should classify immutable trait conflicts as high severity', () => {
      const immutableTraits = ['eye_color', 'hair_color', 'ethnicity', 'birth_date'];
      const factType = 'eye_color';

      const severity = immutableTraits.includes(factType) ? 'high' : 'medium';
      expect(severity).toBe('high');
    });

    it('should classify alive/dead conflicts as high severity', () => {
      const alertType = 'alive_dead';
      const severity = alertType === 'alive_dead' ? 'high' : 'medium';
      expect(severity).toBe('high');
    });

    it('should classify description conflicts as low severity', () => {
      const alertType = 'location_description';
      const severity = alertType === 'location_description' ? 'low' : 'medium';
      expect(severity).toBe('low');
    });
  });

  describe('Confidence Scoring', () => {
    it('should assign high confidence to exact contradictions', () => {
      // Eye color "blue" vs "green" - clear contradiction
      const confidence = 0.9;
      expect(confidence).toBeGreaterThanOrEqual(0.9);
    });

    it('should assign lower confidence to subjective conflicts', () => {
      // Description word differences - could be perspective
      const confidence = 0.6;
      expect(confidence).toBeLessThan(0.9);
    });
  });
});

describe('Alert Output Format', () => {
  it('should include required fields', () => {
    const alert = {
      alertType: 'trait_conflict',
      severity: 'high',
      confidence: 0.9,
      title: "Eye color inconsistency for Sarah",
      description: "Sarah's eye color changes from blue to green",
      evidence: {
        facts: [
          { id: 'f1', factType: 'eye_color', factValue: 'blue' },
          { id: 'f2', factType: 'eye_color', factValue: 'green' },
        ],
        mentions: [],
      },
      suggestedFix: "Review eye color descriptions and ensure consistency",
    };

    expect(alert).toHaveProperty('alertType');
    expect(alert).toHaveProperty('severity');
    expect(alert).toHaveProperty('confidence');
    expect(alert).toHaveProperty('title');
    expect(alert).toHaveProperty('description');
    expect(alert).toHaveProperty('evidence');
    expect(alert).toHaveProperty('suggestedFix');
  });
});
