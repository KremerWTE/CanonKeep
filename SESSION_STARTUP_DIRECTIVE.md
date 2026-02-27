# Session Startup Directive — CanonKeep

**Purpose:** Startup protocol for every new session on this repository
**Status:** MANDATORY — execute at the start of every session
**Version:** 3.0

---

## Session Startup Protocol

### Step 1: Verify Project Context and Branch Safety

```bash
pwd
git branch --show-current
git status
```

**Expected:**
- Working directory: `C:\Users\Chris Kremer\Documents\GitHub\CanonKeep`
- Git repo rooted at workspace level

**Protected Branches (NO DIRECT COMMITS):**
- `main` or `master`
- Any branch containing: `beta`, `stage`, `production`, `prod`, `deploy`

**If on protected branch, STOP and warn the user before proceeding.**

---

### Step 2: Sync with Remote

```bash
git fetch origin
CURRENT_BRANCH=$(git branch --show-current)
git pull origin $CURRENT_BRANCH
```

---

### Step 3: Load Project Context

Read in order:

1. **Latest session file** in `sessions/` (most recent `YYYY-MM-DD_*.md`) if it exists
2. **`MASTER_TODO.md`** — overall completion and critical items
3. **`README.md`** — project overview and setup

---

### Step 4: Check Build Status

```bash
cd canon-keep
npm run build
```

**Expected:** Clean build, 0 errors

---

### Step 5: Present Session Startup Summary

```
# Session Startup — CanonKeep

**Branch:** [current branch]
**Branch Status:** [Safe / Protected - needs confirmation]
**Last Session:** [date from sessions/ or "No previous session found"]

## Context Loaded
- Latest session summary reviewed
- README and MASTER_TODO checked
- Build status: [clean / errors]

## Current State
- Project: AI-powered canon/continuity tracking tool
- Recent accomplishments: [from last session]
- Open items: [from MASTER_TODO or last session]

## Recommended Next Steps
1. [Highest priority from MASTER_TODO]
2. [Second priority]
3. [Third priority]

What would you like to focus on this session?
```

---

## Project Overview

**Type:** Node.js / TypeScript AI tool
**Repo root:** `C:\Users\Chris Kremer\Documents\GitHub\CanonKeep`
**Active branch:** `kremer-dev` (default development branch)
**Tech stack:** Node.js, TypeScript, Next.js, Prisma (SQLite), AI integrations
**Build command:** `npm run build` (run from `canon-keep/`)
**Package manager:** npm

**Root folder structure:**
```
CanonKeep/
├── .claude/          — Claude Code memory and settings
├── .github/          — GitHub Actions workflows, PR templates
├── canon-keep/       — Main Next.js application
│   ├── prisma/       — Database schema and migrations
│   ├── src/          — Application source code
│   └── public/       — Static assets
├── data/             — Data files
├── docs/             — Project documentation
├── five-feet-from-home/  — Story project reference materials
├── scripts/          — Utility and deployment scripts
├── src/              — Shared source utilities
├── .gitignore
├── MASTER_TODO.md
├── README.md
└── SESSION_STARTUP_DIRECTIVE.md
```

---

## Critical Rules

### Git Workflow

**ALLOWED:**
- Commit to development or feature branches (e.g., `kremer-dev`, `feature/*`)
- Create PRs to `main` from feature branches

**FORBIDDEN (without explicit user confirmation):**
- Direct commits to `main` or `master`
- Force push to any branch
- `git reset --hard` on shared branches

### Commit Standards

**NEVER:**
- Add "Co-Authored-By: Claude" or any AI attribution
- Commit secrets, API keys, or credentials
- Commit `.env` files

### Security-Sensitive Files
- `.env` files — API keys and secrets (covered by `.gitignore`)
- `*.db` files — SQLite databases (covered by `.gitignore`)
- Never commit actual credentials

---

## Session End Protocol

After significant work:

1. **Update** `MASTER_TODO.md` if tasks changed
2. **Write** session summary: `sessions/YYYY-MM-DD_brief-description.md`
3. **Commit** staged changes with conventional commit message
4. **Push** to `kremer-dev` (or current feature branch)
5. **Update** MEMORY.md → "Top Priorities for Next Session"

---

## Quick Verification Checklist

- [ ] Current branch identified and safety checked
- [ ] Synced with remote (`git pull` completed)
- [ ] Latest session summary reviewed
- [ ] `MASTER_TODO.md` reviewed
- [ ] Build verified in `canon-keep/`
- [ ] Session startup summary presented to user

---

**Created:** 2026-02-24
**Updated:** 2026-02-27
**Version:** 3.0
**Project:** CanonKeep — Node.js/TypeScript AI Continuity Tool
**Repo:** `C:\Users\Chris Kremer\Documents\GitHub\CanonKeep`
**Remote:** `https://github.com/KremerWTE/CanonKeep.git`
