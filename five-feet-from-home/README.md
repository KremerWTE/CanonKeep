# Story Site

An internal web application for managing narrative content from Word documents. Designed for writers who use ChatGPT or other tools to generate story content and need a structured way to organize, cross-reference, and export their work.

## Features

- **Document Ingestion**: Parse `.docx` files and extract structured content
- **Entity Extraction**: Automatically identify characters, locations, chapters, plot threads, and events
- **Cross-Linking**: Detect character mentions, relationships, and connections between entities
- **Continuity Checking**: Find conflicts, gaps, and inconsistencies in your story
- **Book Builder**: Assemble chapters into books and export manuscripts
- **Full-Text Search**: Find anything in your story content
- **Provenance Tracking**: Every extracted field links back to its source document

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd story-site

# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Seed with sample data (optional)
npm run seed
```

### Running the Application

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Document Ingestion

### Adding Documents

1. Place your `.docx` files in the `./ingest` folder
2. Run the ingestion command:

```bash
npm run ingest
```

### Document Format

The ingestion pipeline recognizes several patterns:

#### Characters

```
# Character: Maya Chen

Name: Maya Chen
Age: 32
Archetype: Protagonist
Background: Former scientist who lost her memories...
Motivation: To recover her lost memories
Fear: That she won't like who she was
Flaw: Trusts technology over people
Secret: She invented the memory-wipe procedure
Voice Notes: Speaks in clipped sentences...
```

#### Chapters

```
# Chapter 1: The Beginning

Synopsis: Maya wakes with no memory of who she is...
POV: Maya Chen

The rain hadn't stopped for three days. Maya watched it...
```

#### Plot Threads

```
# Plot Thread: The Search for Identity

Premise: Maya must piece together who she was...
Stakes: If she doesn't find her memories, she'll never know who she is.
```

#### Locations

```
# Location: The Vault

Description: An underground bunker where memories are stored...
Significance: Represents the weight of the past
```

### Ingestion Options

```bash
# Default project name
npm run ingest

# Custom project name
npm run ingest -- --project="My Novel"

# Clear existing data before ingesting
npm run ingest -- --clear
```

## Configuration

Edit `config.json` to customize:

- Default project name
- Ingest path
- Tags (genres, POV styles, tones, themes)
- Extraction patterns
- Naming rules

```json
{
  "defaultProject": "STORY_PROJECT",
  "ingestPath": "./ingest",
  "extraction": {
    "characterHeadingPatterns": [
      "^Character:\\s*(.+)$",
      "^(.+)\\s*[-—]\\s*(?:Background|Profile|Bio)$"
    ]
  }
}
```

## Usage Guide

### Dashboard

The dashboard provides an overview of your story content:
- Entity counts (characters, chapters, plots, etc.)
- Recent projects
- Quick actions
- Conflict alerts

### Characters

View and explore your characters:
- Profile information (background, motivations, fears, flaws, secrets)
- Character arc (start, change, end)
- Relationships with other characters
- Chapter appearances
- Plot thread involvements

### Chapters

Manage your chapter content:
- Synopsis and beats
- POV character
- Scene breakdowns
- Linked characters and plot threads
- Draft text

### Plot Threads

Track your storylines:
- Premise and stakes
- Story phases
- Resolution
- Involved characters
- Chapter appearances

### Timeline

View events in chronological order:
- Event descriptions
- Participants and locations
- Chapter references
- Consequences

### Continuity & Gaps

Find issues in your story:
- Detected conflicts (duplicate entities, timeline issues)
- Underdeveloped characters (missing motivations, fears, flaws)
- Dangling plot threads (no resolution)
- Chapters without POV
- Isolated characters (no relationships)

### Book Builder

Assemble your manuscript:
1. Create a new book with title and project
2. Select chapters to include
3. Arrange chapter order
4. Export as Markdown

### Search

Find anything in your story:
- Full-text search across all entities
- Filter by entity type
- View matched snippets

## Project Structure

```
story-site/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── characters/        # Character pages
│   │   ├── chapters/          # Chapter pages
│   │   ├── plots/             # Plot thread pages
│   │   ├── timeline/          # Timeline view
│   │   ├── locations/         # Location pages
│   │   ├── continuity/        # Continuity dashboard
│   │   ├── builder/           # Book builder
│   │   └── search/            # Search page
│   ├── components/            # React components
│   ├── lib/                   # Core logic
│   │   ├── ingest/           # Docx parsing pipeline
│   │   ├── extraction/       # Entity extraction
│   │   ├── export/           # Manuscript export
│   │   ├── db.ts             # Database client
│   │   └── search.ts         # Search functionality
│   └── types/                 # TypeScript definitions
├── prisma/
│   └── schema.prisma          # Database schema
├── scripts/
│   ├── ingest.ts             # Ingestion CLI
│   ├── seed.ts               # Sample data seeder
│   └── create-sample-doc.ts  # Sample document generator
├── tests/                     # Test files
├── ingest/                    # Document input folder
├── config.json               # Configuration
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run ingest` | Ingest documents from ./ingest |
| `npm run ingest:clear` | Clear data and re-ingest |
| `npm run seed` | Seed with sample data |
| `npm run migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run test` | Run tests |

## Data Model

### Core Entities

- **Project**: Container for all story content
- **Document**: Source Word documents
- **ContentBlock**: Extracted text blocks with metadata
- **Character**: People in your story
- **Location**: Places in your story world
- **Faction**: Organizations and groups
- **PlotThread**: Storylines and arcs
- **Event**: Timeline events
- **Chapter**: Story chapters with scenes
- **Book**: Collection of chapters

### Relationships

- **CharacterRelationship**: Links between characters
- **ChapterCharacter**: Characters appearing in chapters
- **PlotCharacter**: Characters involved in plot threads
- **EventCharacter**: Characters participating in events
- **Provenance**: Links entities to source document blocks

### Quality Tracking

- **Conflict**: Detected continuity issues
- **Note**: Unclassified content for review

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Creating a Sample Document

Generate a sample `.docx` file for testing:

```bash
npx tsx scripts/create-sample-doc.ts
npm run ingest
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma
- **Styling**: Tailwind CSS
- **Document Parsing**: mammoth
- **Testing**: Vitest

## Future Enhancements

Potential features for future development:

- AI-powered entity extraction (using LLMs)
- Character voice consistency checking
- Theme and motif tracking
- Writing statistics and progress tracking
- Export to additional formats (EPUB, PDF)
- Collaborative editing support
- Version control for documents
- AI writing suggestions based on extracted content

## License

MIT

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting a PR.
