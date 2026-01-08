# Data Setup Guide

This project uses a template-based approach to keep your data private and out of version control.

## Setup Instructions

1. **Copy the template file:**
   ```bash
   cp app/lib/data.ts.template app/lib/data.ts
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
- `app/lib/data.ts` - Your actual data file
- `public/audio/` - All audio files
- `public/images/` - All image files
- `public/videos/` - All video files
- `data/` - Any additional data directory

## Template File

The `data.ts.template` file is kept in version control as a reference for the data structure. Your actual `data.ts` file with real content will be gitignored.

