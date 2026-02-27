-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "genre" TEXT,
    "povStyle" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileHash" TEXT NOT NULL,
    "ingestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModified" DATETIME NOT NULL,
    CONSTRAINT "Document_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "sectionHeading" TEXT,
    "blockIndex" INTEGER NOT NULL,
    "rawText" TEXT NOT NULL,
    "styleType" TEXT NOT NULL,
    "headingLevel" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentBlock_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Provenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "fieldName" TEXT,
    "confidence" REAL NOT NULL DEFAULT 1.0,
    CONSTRAINT "Provenance_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "ContentBlock" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aliases" TEXT,
    "archetype" TEXT,
    "age" TEXT,
    "background" TEXT,
    "motivations" TEXT,
    "fears" TEXT,
    "flaw" TEXT,
    "secrets" TEXT,
    "voiceNotes" TEXT,
    "appearance" TEXT,
    "arcStart" TEXT,
    "arcChange" TEXT,
    "arcEnd" TEXT,
    "tags" TEXT,
    "rawNotes" TEXT,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Character_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CharacterRelationship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fromCharacterId" TEXT NOT NULL,
    "toCharacterId" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "description" TEXT,
    "confidence" REAL NOT NULL DEFAULT 1.0,
    CONSTRAINT "CharacterRelationship_fromCharacterId_fkey" FOREIGN KEY ("fromCharacterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CharacterRelationship_toCharacterId_fkey" FOREIGN KEY ("toCharacterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rules" TEXT,
    "significance" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Location_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Faction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "goals" TEXT,
    "methods" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Faction_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlotThread" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "premise" TEXT,
    "stakes" TEXT,
    "phases" TEXT,
    "resolution" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PlotThread_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlotCharacter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plotThreadId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "role" TEXT,
    CONSTRAINT "PlotCharacter_plotThreadId_fkey" FOREIGN KEY ("plotThreadId") REFERENCES "PlotThread" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlotCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "timelineRef" TEXT,
    "timelineSort" INTEGER,
    "consequences" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventCharacter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "role" TEXT,
    CONSTRAINT "EventCharacter_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EventCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    CONSTRAINT "EventLocation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EventLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "bookId" TEXT,
    "number" INTEGER,
    "title" TEXT,
    "synopsis" TEXT,
    "beats" TEXT,
    "draftText" TEXT,
    "pov" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "wordCount" INTEGER,
    "tags" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Chapter_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "locationId" TEXT,
    "sceneNumber" INTEGER NOT NULL,
    "description" TEXT,
    "draftText" TEXT,
    "goal" TEXT,
    "conflict" TEXT,
    "outcome" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Scene_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Scene_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChapterCharacter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "role" TEXT,
    CONSTRAINT "ChapterCharacter_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ChapterCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChapterPlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "plotThreadId" TEXT NOT NULL,
    "advancement" TEXT,
    CONSTRAINT "ChapterPlot_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ChapterPlot_plotThreadId_fkey" FOREIGN KEY ("plotThreadId") REFERENCES "PlotThread" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChapterEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "ChapterEvent_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ChapterEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "synopsis" TEXT,
    "structure" TEXT,
    "status" TEXT NOT NULL DEFAULT 'planning',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Book_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Conflict" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "conflictType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "entityTypeA" TEXT NOT NULL,
    "entityIdA" TEXT NOT NULL,
    "fieldA" TEXT,
    "entityTypeB" TEXT,
    "entityIdB" TEXT,
    "fieldB" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolution" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Conflict_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "suggestedType" TEXT,
    "suggestedName" TEXT,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Note_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Document_projectId_fileName_key" ON "Document"("projectId", "fileName");

-- CreateIndex
CREATE INDEX "ContentBlock_documentId_idx" ON "ContentBlock"("documentId");

-- CreateIndex
CREATE INDEX "Provenance_entityType_entityId_idx" ON "Provenance"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "Provenance_blockId_idx" ON "Provenance"("blockId");

-- CreateIndex
CREATE INDEX "Character_projectId_idx" ON "Character"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_projectId_name_key" ON "Character"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterRelationship_fromCharacterId_toCharacterId_relationshipType_key" ON "CharacterRelationship"("fromCharacterId", "toCharacterId", "relationshipType");

-- CreateIndex
CREATE INDEX "Location_projectId_idx" ON "Location"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_projectId_name_key" ON "Location"("projectId", "name");

-- CreateIndex
CREATE INDEX "Faction_projectId_idx" ON "Faction"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Faction_projectId_name_key" ON "Faction"("projectId", "name");

-- CreateIndex
CREATE INDEX "PlotThread_projectId_idx" ON "PlotThread"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "PlotThread_projectId_name_key" ON "PlotThread"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PlotCharacter_plotThreadId_characterId_key" ON "PlotCharacter"("plotThreadId", "characterId");

-- CreateIndex
CREATE INDEX "Event_projectId_idx" ON "Event"("projectId");

-- CreateIndex
CREATE INDEX "Event_timelineSort_idx" ON "Event"("timelineSort");

-- CreateIndex
CREATE UNIQUE INDEX "EventCharacter_eventId_characterId_key" ON "EventCharacter"("eventId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "EventLocation_eventId_locationId_key" ON "EventLocation"("eventId", "locationId");

-- CreateIndex
CREATE INDEX "Chapter_projectId_idx" ON "Chapter"("projectId");

-- CreateIndex
CREATE INDEX "Chapter_bookId_idx" ON "Chapter"("bookId");

-- CreateIndex
CREATE INDEX "Scene_chapterId_idx" ON "Scene"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterCharacter_chapterId_characterId_key" ON "ChapterCharacter"("chapterId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterPlot_chapterId_plotThreadId_key" ON "ChapterPlot"("chapterId", "plotThreadId");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterEvent_chapterId_eventId_key" ON "ChapterEvent"("chapterId", "eventId");

-- CreateIndex
CREATE INDEX "Book_projectId_idx" ON "Book"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Book_projectId_title_key" ON "Book"("projectId", "title");

-- CreateIndex
CREATE INDEX "Conflict_projectId_idx" ON "Conflict"("projectId");

-- CreateIndex
CREATE INDEX "Conflict_resolved_idx" ON "Conflict"("resolved");

-- CreateIndex
CREATE INDEX "Note_projectId_idx" ON "Note"("projectId");

-- CreateIndex
CREATE INDEX "Note_processed_idx" ON "Note"("processed");
