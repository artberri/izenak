# izenak

A cross-platform Basque Names Finder mobile application built with Expo and React Native.

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bun start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Scraper

The `scraper/` directory contains a Python script to scrape Basque names from [Euskaltzaindia](https://www.euskaltzaindia.eus).

### Requirements

- Python 3.10+

### Setup

```bash
bun run scraper:setup
```

This creates a virtual environment and installs dependencies.

### Run

```bash
bun run scraper
```

This scrapes all names and outputs them to `scraper/names.json`. The scraper has a 2-second delay between requests to be respectful to the server.

### Data Curation

After scraping, check for duplicate entries:

```bash
bun run scraper:check
```

This script identifies:

- **Exact duplicates** - identical entries that should be removed
- **Same gender duplicates** - same name/gender with different meanings (review needed)
- **Different gender entries** - same name for different genders (usually intentional)

Manually edit `scraper/names.json` to remove duplicates until the script reports no issues.

## Database

The app uses [Turso](https://turso.tech/) as the remote database with [Drizzle ORM](https://orm.drizzle.team/).

### Setup

Create a `.env.local` based on the `.env.example` file.

### Migrations

Generate and apply database migrations:

```bash
bun run db:generate --name=migration_name
bun run db:migrate
```

### Seeding

After scraping names and running migrations, seed the database:

```bash
bun run db:seed
```

This reads `scraper/names.json`, transforms the data, and upserts all names into the Turso database.
