# Seed Names to Turso Database

## Goal

Create a TypeScript script that reads Basque names from `scraper/names.json` and inserts or updates them in the remote Turso database, with proper data transformation.

## Context

### Relevant Files

- [`scraper/names.json`](../../scraper/names.json) - Source data with ~2000+ Basque names
- [`db/schema.ts`](../../db/schema.ts) - Drizzle schema defining the `namesTable`
- [`drizzle.config.ts`](../../drizzle.config.ts) - Turso database connection configuration
- [`scripts/check-duplicates.js`](../../scripts/check-duplicates.js) - Reference script for reading names.json
- [`package.json`](../../package.json) - Scripts configuration
- [`README.md`](../../README.md) - Documentation to update

### Data Transformation

| JSON Field     | Schema Field             | Transformation                               |
| -------------- | ------------------------ | -------------------------------------------- |
| `name`         | `name` (PK)              | None                                         |
| `gender`       | `gender`                 | None (values match enum)                     |
| `meaning`      | `meaning`                | None                                         |
| `translations` | `translations` (JSON)    | Parse string → array with ISO language codes |
| `hipocoristic` | `hipocoristic` (boolean) | `"bai"` → `true`, `"ez"` → `false`           |

### Language Code Mapping

Basque language names to ISO 639-1 codes:

| Basque     | ISO Code |
| ---------- | -------- |
| gaztelania | es       |
| frantsesa  | fr       |
| ingelesa   | en       |
| grekoa     | el       |
| italiera   | it       |
| portugesa  | pt       |
| alemana    | de       |
| errusiera  | ru       |
| japoniera  | ja       |
| txinera    | zh       |
| arabiera   | ar       |
| hebreera   | he       |
| latina     | la       |

## Phase 1: Create seed script, npm command, and documentation

### Description

Create a TypeScript script that reads names from the JSON file, transforms the data to match the database schema (including parsing translations with standardized language codes), and upserts all records into the Turso database. Add the npm script and update README.

### To-do

- [x] Create `scripts/seed-names.ts` with:
  - [x] Read `scraper/names.json`
  - [x] Transform `hipocoristic` from "bai"/"ez" to boolean
  - [x] Parse `translations` string into array of `{language: string, translation: string}` with ISO codes
  - [x] Use Drizzle ORM to upsert names (insert on conflict update)
  - [x] Log progress (total, success, errors)
- [x] Add `"db:seed"` script to `package.json`
- [x] Update `README.md` with "Database Seeding" section
- [x] Run `bun run lint` and `bun run fmt` to ensure code quality

## Next Step

Plan completed. All tasks have been implemented.
