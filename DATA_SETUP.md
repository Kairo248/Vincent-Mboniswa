# Data Setup Guide

This project uses a template-based approach to keep your data private and out of version control.

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp app/lib/data.ts.example app/lib/data.ts
   ```

2. **Add your media files:**
   - Place audio files in `public/audio/`
   - Place images in `public/images/`
   - Place videos in `public/videos/`

3. **Fill in your data:**
   - Open `app/lib/data.ts`
   - Add your music tracks, albums, sermons, events, gallery items, and social links
   - Follow the TypeScript interfaces defined in `app/types/index.ts`

## What's Gitignored

The following files and directories are excluded from git:
- `app/lib/data.ts` - Your actual data file (must exist locally for builds to work)
- `public/audio/` - All audio files
- `public/images/` - All image files
- `public/videos/` - All video files
- `data/` - Any additional data directory

## Important Notes

- **The `data.ts` file MUST exist locally** for the build to work, even though it's gitignored
- The `data.ts.example` file is tracked in git as a reference
- If you get "module not found" errors, ensure `data.ts` exists in `app/lib/`
- Clear Next.js cache if needed: `rm -rf .next` (or delete `.next` folder)

