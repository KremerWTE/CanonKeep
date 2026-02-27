# Five Feet From Home - Story Site TODO

## Current Database Status (Verified)
| Entity | Count | Status |
|--------|-------|--------|
| Characters | 153 | Data imported from spreadsheet |
| Documents | 67 | Ingested from Word files |
| Events | 150 | Populated |
| Crises | 6 | Populated |
| Organizations | 7 | Populated |
| Galas | 6 | Populated |
| Business Trips | 5 | Populated |
| Book Series | 10 | Populated |

---

## Completed Features

### Data & Schema
- [x] Character schema with 30+ fields (names, affiliations, career history, etc.)
- [x] Import 153 characters from Excel spreadsheet (BSS_Master_Characters_All_In_One.xlsx)
- [x] Ingest 67 Word documents
- [x] Crisis model and data (6 crises)
- [x] Organization model and data (7 organizations)
- [x] Gala model and data (6 galas)
- [x] Business Trip model and data (5 trips)
- [x] Book Series model and data (10 series)

### Pages Created
| Page | Route | Working |
|------|-------|---------|
| Dashboard | `/` | Yes |
| Characters List | `/characters` | Yes |
| Character Detail | `/characters/[id]` | Yes |
| Character Edit | `/characters/[id]/edit` | Yes |
| Character Search | `/character-search` | Yes |
| BSS Roster | `/bss-roster` | Yes |
| Wives Club | `/wives-club` | Yes |
| Timeline | `/timeline` | Yes |
| Backstory Timeline | `/timeline/backstories` | Yes |
| Chapters | `/chapters` | Yes |
| Plot Threads | `/plots` | Yes |
| Locations | `/locations` | Yes |
| Crises | `/crises` | Yes |
| Organizations | `/organizations` | Yes |
| Galas | `/galas` | Yes |
| Business Trips | `/trips` | Yes |
| Book Series | `/series` | Yes |
| Search | `/search` | Yes |
| Book Builder | `/builder` | Yes |
| Continuity | `/continuity` | Yes |

---

## Completed Features (User Requested)

### Character Enhancements
- [x] **AI character picture generation** - `/portraits` - Generate portrait prompts based on "modeled after" or physical description
- [x] **Lookalike conflict detection** - `/lookalikes` - Flag when multiple characters share same actress/model reference
- [x] **Relationship boxes on character cards** - Color-coded boxes on `/characters/[id]` page

### Character Card Fields (All in Schema)
- [x] Titles, First Name, Last Name(s)
- [x] Nickname / Call-sign
- [x] Name Variants
- [x] Wives Club role
- [x] BSS role
- [x] Affiliation / Role
- [x] Hub / Location
- [x] Education
- [x] Career History
- [x] Modeled After / Lookalike
- [x] Personality
- [x] Relationships
- [x] Source Files
- [x] Physical Description
- [x] Wardrobe / Style
- [x] Fitness / Sports
- [x] Catchphrases
- [x] Major Cases / Projects
- [x] Mentors / Mentees
- [x] First Appearance
- [x] Reputational Notes
- [x] Faith / Roots
- [x] Clubs / Associations

### Book Series (In Database)
1. Five Feet From Home (Main - Jasper)
2. The Fixer's Wife (Spin-off - Addie)
3. Wild Hearts (Spin-off - Bella)
4. Midnight Sun (Spin-off - Selene)
5. Spring Break (Spin-off - Izzy)
6. Ridge's Road (Spin-off - Ridge)
7. The Cooking Class (Companion - Wives Club)
8. The Teacher's Heart (Spin-off - Maggie)
9. Faith & Fortune (Spin-off - Chris & Kendra)
10. Lottie's Seating Chart (Companion - Lottie)

### Edit Pages Needed
- [x] Crisis edit page
- [x] Organization edit page
- [x] Gala edit page
- [x] Business trip edit page
- [x] Book series edit page

---

## Characters with Lookalikes (For Conflict Detection)
These characters have "Modeled After" data:
- Elena Davenport-Barrett: Brooke Davis (OTH) + Alana Hayes (SEAL Team)
- Grace Barrett: Jamie Scott (OTH)
- Addie Price: Mike Ross (Suits) + Sarah Walker (Chuck)
- Kendra Holt: Kristen Narduzzi + Katrin Davidsdottir + Jeannie Ducharme
- Harper Montgomery: Olivia Pope energy (Scandal)
- Alexis "Lex" Navarro: Carla Gugino + Rosario Dawson
- Rina Patel: Bridget Sullivan (The Unit) + Lisa Davis (SEAL Team)
- Lexi Shaw: Dollar Bill (Billions) + Abby Whelan (Scandal); look: Kate Mara
- Daniel Marchand: Blake Moran (Madam Secretary)
- Claire Donavan: Carrie Coon / Amy Adams
- Riley: Olivia Munn / Sloan Sabbith archetype
- Camille "Cam" Whitmore: Tiffani Thiessen + Lacey Chabert
- Colette Dubois: Reese Witherspoon (BLL) with NOLA flair
- Sabrina Bloomfield: Molly's Game + elite Olympians
- Riley St. James: Gisele Bündchen + Kristin Cavallari
- Isabella Santore: Caissie Levy
- Sofia "Sofie" Larkin: Luciane Buchanan
- Nadia Trani (Nadia Noir): Eiza González
- Margaret "Mags" Davenport: Lee Radziwill + Boston matriarch
- Patricia Van Horn: CZ Guest + Lynn Wyatt
- Caroline "Caro" Chang: Sheryl Sandberg x Olivia Pope chic

---

## Completed Enhancements
- [x] Interactive timeline visualization - `/timeline/interactive`
- [x] Character relationship graph - `/relationships`
- [x] Export character bible as PDF - `/export/character-bible`
- [x] Bulk character editing - `/characters/bulk-edit`
- [x] Document re-parsing - `/documents` (with change detection)
- [x] Search within document types - `/search/advanced`
- [x] Tag system for cross-referencing - `/tags`
- [x] Notes/annotations system - `/notes`
- [x] Version history for edits - `/history`

## Future Ideas
- [ ] User authentication
- [ ] Multi-user collaboration
- [ ] Mobile-responsive improvements
- [ ] Export to other formats (DOCX, ePub)
- [ ] AI-assisted writing suggestions
