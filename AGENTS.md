# AGENTS.md

## Project Overview

**izenak** - A cross-platform Basque Names Finder for parents mobile application built with Expo and React Native.

## Tech Stack

- **React Native** 0.81.5 - Core mobile framework
- **Expo** ~54 - Build and deployment framework
- **React** 19.1 - UI library
- **TypeScript** 5.9 - Strict type-checking enabled
- **Expo Router** ~6 - File-based routing
- **oxlint** - High-performance linter
- **prettier** - Code formatter
- **Drizzle ORM** - Database ORM
- **Turso** - Remote database

## Directory Structure

```
app/          # Routes (file-based via Expo Router)
  (tabs)/     # Tab navigation
components/   # Reusable UI components
constants/    # Theme configuration
db/           # Database schema (drizzle)
hooks/        # Custom React hooks
assets/       # Images and static files
scripts/      # Build/setup/scrape scripts
```

## Scripts

Using **bun** as the package manager:

- `bun start` - Start Expo dev server
- `bun run android` - Run on Android
- `bun run ios` - Run on iOS
- `bun run web` - Run on web
- `bun run lint` - Run linter
- `bun run fmt` - Format code

## Configuration

- `app.config.ts` - Expo app configuration
- `tsconfig.json` - TypeScript config with path aliases (`@/*`)
- `.oxlintrc.json` - Linter rules
- `drizzle.config.json` - Drizzle ORM configuration

## Common workflow

1. Use baby steps to make changes in the code
2. Run `bun run lint` and `bun run fmt` and fix all errors before considering a baby step done
3. Ask the developer if he wants to review the code before commiting
4. Commit using conventional commit messages
5. Update the plan if applicable
6. Start next step

## Database

The app uses [Turso](https://turso.tech/) as the remote database with [Drizzle ORM](https://orm.drizzle.team/).

**IMPORTANT**: Never edit files in the `drizzle` folder manually. They are generated with Drizzle migrations.

### Migrations

Generate and apply database migrations:

```bash
bun run db:generate --name=migration_name
bun run db:migrate
```
