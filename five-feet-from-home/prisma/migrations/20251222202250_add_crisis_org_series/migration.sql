-- CreateTable
CREATE TABLE "Crisis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "codeName" TEXT,
    "clientName" TEXT,
    "clientType" TEXT,
    "crisisType" TEXT,
    "severity" TEXT,
    "location" TEXT,
    "timeframe" TEXT,
    "description" TEXT,
    "situation" TEXT,
    "complications" TEXT,
    "resolution" TEXT,
    "outcome" TEXT,
    "lessonsLearned" TEXT,
    "bssTeam" TEXT,
    "stakes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "bookAppearance" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Crisis_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "type" TEXT,
    "industry" TEXT,
    "description" TEXT,
    "headquarters" TEXT,
    "founded" TEXT,
    "founder" TEXT,
    "leadership" TEXT,
    "employees" TEXT,
    "services" TEXT,
    "clients" TEXT,
    "competitors" TEXT,
    "relationships" TEXT,
    "significance" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Organization_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookSeries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seriesType" TEXT,
    "protagonist" TEXT,
    "premise" TEXT,
    "themes" TEXT,
    "totalBooks" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'planned',
    "readingOrder" INTEGER,
    "parentSeries" TEXT,
    "connections" TEXT,
    "timeline" TEXT,
    "books" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BookSeries_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Crisis_projectId_idx" ON "Crisis"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Crisis_projectId_name_key" ON "Crisis"("projectId", "name");

-- CreateIndex
CREATE INDEX "Organization_projectId_idx" ON "Organization"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_projectId_name_key" ON "Organization"("projectId", "name");

-- CreateIndex
CREATE INDEX "BookSeries_projectId_idx" ON "BookSeries"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "BookSeries_projectId_name_key" ON "BookSeries"("projectId", "name");
