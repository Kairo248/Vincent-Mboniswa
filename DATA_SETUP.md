# Data Setup Guide

This project uses a template-based approach to keep your data private and out of version control.

## Setup Instructions

1. **Copy the example file (if not already done):**
   ```bash
   cp app/lib/data.example.ts app/lib/data.ts
   ```
   **Note:** The build script automatically copies `data.example.ts` to `data.ts` if it doesn't exist, so this step is optional.

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
- `app/lib/data.ts` - Your actual data file (gitignored but required for builds)
- `public/audio/` - All audio files
- `public/images/` - All image files
- `public/videos/` - All video files
- `data/` - Any additional data directory

## Build Process

- **Automatic Fallback:** The `prebuild` script automatically copies `data.example.ts` to `data.ts` if it doesn't exist
- This ensures builds work in CI/CD environments where `data.ts` is missing
- Your actual `data.ts` with real content will be gitignored and kept private

## Important Notes

- **The `data.ts` file is gitignored** - your actual data won't be committed
- **The `data.example.ts` file is tracked** - serves as a template/reference
- **Builds work automatically** - the prebuild script handles the fallback
- For production, ensure your actual `data.ts` and media files are available in your deployment environment

