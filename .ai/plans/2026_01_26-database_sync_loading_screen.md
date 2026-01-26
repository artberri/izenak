# Database Sync Loading Screen

## Goal

Add a simple loading indicator that displays while the local database syncs with the remote Turso database on app startup.

## Context

- [`app/_layout.tsx`](../../app/_layout.tsx) - Root layout that initializes SQLiteProvider and syncs the database
- [`app-example/components/`](../../app-example/components/) - Existing component patterns (ThemedView, ThemedText)
- [`constants/`](../../constants/) - Theme configuration

## Phases

### Phase 1: Create LoadingScreen component

Create a simple loading screen component following existing patterns.

- [x] Create `components/loading-screen.tsx` with centered `ActivityIndicator` and "Kargatzen..." text
- [x] Use `View` and `Text` from React Native (simple approach)
- [x] Run lint and format

### Phase 2: Integrate loading state in root layout

Add loading state management to show the loading screen while the database syncs.

- [x] Add `isLoading` state to `app/_layout.tsx`
- [x] Show `LoadingScreen` while syncing
- [x] Render `Stack` only after sync completes
- [x] Handle error state gracefully (using `finally` block)
- [x] Run lint and format

## Next step

Plan complete. Ready to commit.
