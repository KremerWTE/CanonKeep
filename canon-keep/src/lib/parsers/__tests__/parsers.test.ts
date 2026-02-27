import { detectEntitiesHeuristic } from '../../extraction/entities';

describe('Entity Detection Heuristics', () => {
  describe('Speaker Detection', () => {
    it('should detect speaker from dialogue pattern: "text," Name said', () => {
      const text = '"I cannot believe it," Sarah said quietly.';
      const entities = detectEntitiesHeuristic(text);

      expect(entities).toContainEqual(
        expect.objectContaining({
          name: 'Sarah',
          type: 'character',
        })
      );
    });

    it('should detect speaker from pattern: Name said, "text"', () => {
      const text = 'John replied, "That makes sense to me."';
      const entities = detectEntitiesHeuristic(text);

      expect(entities).toContainEqual(
        expect.objectContaining({
          name: 'John',
          type: 'character',
        })
      );
    });

    it('should detect multiple speakers', () => {
      const text = `
        "Hello," Alice said.
        Bob replied, "Hi there!"
        "How are you?" Charlie asked.
      `;
      const entities = detectEntitiesHeuristic(text);
      const names = entities.map(e => e.name);

      expect(names).toContain('Alice');
      expect(names).toContain('Bob');
      expect(names).toContain('Charlie');
    });

    it('should detect various speech verbs', () => {
      const text = `
        "Stop!" Maria shouted.
        "Please," Elena whispered.
        "Why?" James asked.
        "Because," answered Kate.
      `;
      const entities = detectEntitiesHeuristic(text);
      const names = entities.map(e => e.name);

      expect(names).toContain('Maria');
      expect(names).toContain('Elena');
      expect(names).toContain('James');
    });
  });

  describe('Location Detection', () => {
    it('should detect locations with common suffixes', () => {
      const text = 'They arrived at the Grand Hotel after driving through Central Park.';
      const entities = detectEntitiesHeuristic(text);
      const locations = entities.filter(e => e.type === 'location');

      expect(locations.length).toBeGreaterThan(0);
    });
  });
});

describe('Chapter Detection', () => {
  // These would test the chapter detection patterns
  const CHAPTER_PATTERNS = [
    /^(?:Chapter|CHAPTER)\s+(\d+|[IVXLCDM]+)(?:\s*[:\-–—]\s*(.+))?$/m,
    /^(?:Part|PART)\s+(\d+|[IVXLCDM]+)(?:\s*[:\-–—]\s*(.+))?$/m,
    /^(\d+)\.\s+(.+)$/m,
  ];

  it('should match "Chapter 1" format', () => {
    expect(CHAPTER_PATTERNS[0].test('Chapter 1')).toBe(true);
    expect(CHAPTER_PATTERNS[0].test('Chapter 12')).toBe(true);
    expect(CHAPTER_PATTERNS[0].test('CHAPTER 5')).toBe(true);
  });

  it('should match "Chapter 1: Title" format', () => {
    expect(CHAPTER_PATTERNS[0].test('Chapter 1: The Beginning')).toBe(true);
    expect(CHAPTER_PATTERNS[0].test('Chapter 2 - A New Hope')).toBe(true);
  });

  it('should match Roman numeral chapters', () => {
    expect(CHAPTER_PATTERNS[0].test('Chapter I')).toBe(true);
    expect(CHAPTER_PATTERNS[0].test('Chapter XII')).toBe(true);
    expect(CHAPTER_PATTERNS[0].test('CHAPTER IV')).toBe(true);
  });

  it('should match Part format', () => {
    expect(CHAPTER_PATTERNS[1].test('Part 1')).toBe(true);
    expect(CHAPTER_PATTERNS[1].test('Part II: The Journey')).toBe(true);
    expect(CHAPTER_PATTERNS[1].test('PART 3')).toBe(true);
  });

  it('should match numbered format', () => {
    expect(CHAPTER_PATTERNS[2].test('1. Introduction')).toBe(true);
    expect(CHAPTER_PATTERNS[2].test('42. The Answer')).toBe(true);
  });
});
