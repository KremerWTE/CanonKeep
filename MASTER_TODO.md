# CanonKeep — Master TODO

**Last updated:** 2026-02-27
**Branch:** kremer-dev

---

## Status Legend
- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete
- `[!]` Blocked / needs decision

---

## Infrastructure & Setup

- [x] Initialize root-level git repo
- [x] Connect to GitHub remote (KremerWTE/CanonKeep)
- [x] Push initial content to `kremer-dev` branch
- [x] Create base folder structure (`.claude`, `docs`, `.github`, `scripts`, `src`, `data`)
- [x] Add root `.gitignore`
- [ ] Set up CI/CD workflow in `.github/workflows/`
- [ ] Configure branch protection rules on `main`

---

## CanonKeep Application (`canon-keep/`)

### Core Features
- [ ] Review and document current API routes in `src/app/api/`
- [ ] Finalize Prisma schema and run migrations
- [ ] Implement character management UI (`src/app/projects/`)
- [ ] Build canon/continuity tracking views
- [ ] Integrate AI for continuity checking

### Database
- [ ] Finalize Prisma schema (`prisma/schema.prisma`)
- [ ] Create seed data for development
- [ ] Set up migration workflow

### Testing
- [ ] Configure Jest (`jest.config.js` exists — wire up tests)
- [ ] Write unit tests for API routes
- [ ] Write integration tests

### Build & Deploy
- [ ] Verify clean production build
- [ ] Set up environment variable management
- [ ] Configure deployment target

---

## Documentation

- [ ] Write `docs/architecture.md`
- [ ] Write `docs/api.md` (API route reference)
- [ ] Document data schemas
- [ ] Update root `README.md` with full setup instructions

---

## Story Projects

### five-feet-from-home
- [ ] Assess current state of reference materials
- [ ] Determine integration with CanonKeep app

---

## Next Immediate Actions

1. Verify `npm run build` passes cleanly in `canon-keep/`
2. Review existing API routes and components
3. Document Prisma schema

---

*Update this file at the end of each session.*
