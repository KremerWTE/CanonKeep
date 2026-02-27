# Canon Keep

An AI-native author intelligence platform that ingests manuscripts, parses story canon into structured entities, builds a persistent canon graph, detects continuity conflicts, and provides honest chapter feedback with storyline enhancement suggestions.

## Features

### Core Capabilities
- **Manuscript Upload**: Upload DOCX, PDF, MD, or TXT files
- **Entity Extraction**: Automatically extract characters, locations, events, objects, factions, and themes
- **Canon Graph**: Build a persistent graph of story elements with relationships
- **Consistency Alerts**: Detect contradictions in traits, alive/dead states, timeline, and more
- **AI Feedback**: Get chapter feedback in Gentle, Professional, or Brutal modes
- **Enhancement Suggestions**: AI-powered suggestions that respect your established canon

### Privacy-First
- Your manuscripts are never used for AI training
- All data is stored locally
- Full data export and deletion controls

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd canon-keep
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
# Database (SQLite by default)
DATABASE_URL="file:./dev.db"

# AI Provider - set at least one
ANTHROPIC_API_KEY="your-anthropic-key"
OPENAI_API_KEY="your-openai-key"

# Which provider to use: "anthropic" or "openai"
AI_PROVIDER="anthropic"
```

4. Run database migrations:
```bash
npm run db:migrate
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Usage

### Creating a Project
1. Click "New Project" on the home page
2. Give your project a name
3. You're ready to upload manuscripts!

### Uploading Manuscripts
1. Navigate to your project
2. Go to "Uploads"
3. Drag and drop your manuscript files
4. Wait for processing to complete

### Viewing Canon
- **Entities**: See all extracted characters, locations, objects
- **Relationships**: View connections between entities
- **Timeline**: See events in narrative order
- **Alerts**: Review possible inconsistencies

### Getting Feedback
1. Go to "Chapters"
2. Select a chapter
3. Click "Feedback"
4. Choose your preferred mode:
   - **Gentle**: Encouraging and supportive
   - **Professional**: Balanced, constructive critique
   - **Brutal**: Unfiltered, harsh honesty (opt-in)

### Enhancement Suggestions
1. Go to "Chapters"
2. Select a chapter
3. Click "Enhance"
4. Review AI suggestions that respect your canon

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude / OpenAI GPT-4
- **File Parsing**: mammoth (DOCX), pdf-parse (PDF)

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:migrate   # Run migrations
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # With coverage
```

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Uploads
- `GET /api/projects/[id]/uploads` - List uploads
- `POST /api/projects/[id]/uploads` - Upload file

### Canon
- `GET /api/projects/[id]/entities` - List entities
- `GET /api/projects/[id]/entities/[entityId]` - Entity details
- `GET /api/projects/[id]/relationships` - List relationships
- `GET /api/projects/[id]/events` - List events (timeline)
- `GET /api/projects/[id]/alerts` - List consistency alerts
- `POST /api/projects/[id]/alerts` - Re-run consistency checks

### Feedback
- `GET /api/projects/[id]/chapters/[chapterId]/feedback` - Get feedback
- `POST /api/projects/[id]/chapters/[chapterId]/feedback` - Generate feedback
- `GET /api/projects/[id]/chapters/[chapterId]/enhance` - Get suggestions
- `POST /api/projects/[id]/chapters/[chapterId]/enhance` - Generate suggestions

## Next Upgrades (Pro Tier Features)

- [ ] Real-time collaboration
- [ ] Advanced relationship graph visualization (D3.js)
- [ ] Character arc tracking
- [ ] Plot structure analysis
- [ ] Export to Scrivener/Word with annotations
- [ ] Voice/tone consistency checking
- [ ] POV violation detection
- [ ] Foreshadowing tracking
- [ ] Beta reader feedback integration
- [ ] Version control for manuscripts
- [ ] Multi-series canon linking
- [ ] Custom extraction rules

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   └── projects/          # Project pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── upload/           # Upload components
│   ├── canon/            # Canon display components
│   └── layout/           # Layout components
├── lib/                   # Core libraries
│   ├── ai/               # AI provider abstraction
│   ├── parsers/          # Document parsers
│   ├── extraction/       # Entity extraction
│   ├── consistency/      # Consistency engine
│   └── ingestion/        # Upload processing
└── generated/            # Prisma client
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT
