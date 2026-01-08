# Deployment Guide

## Media Files in Production

Media files (images, videos, audio) are now **tracked in git** and will be deployed automatically. This ensures they're available in production.

## What's Private vs Public

### Private (Gitignored)
- `app/lib/data.ts` - Your actual data (social links, event details, etc.)
- This file contains sensitive information and is kept private

### Public (Tracked in Git)
- `public/images/` - All images
- `public/videos/` - All videos  
- `public/audio/` - All audio files
- These files are needed for the site to work and are deployed

## Deployment Options

### Option 1: Standard Deployment (Recommended)
Media files are committed to git and deployed automatically:
```bash
git add public/
git commit -m "Add media files"
git push
```

### Option 2: CDN/External Storage
If you prefer to keep media files private:
1. Upload files to a CDN (Cloudinary, AWS S3, etc.)
2. Update file paths in `data.ts` to use CDN URLs
3. Add CDN URLs to `.gitignore` if needed

### Option 3: Environment-Based
Use environment variables for media file paths:
- Development: Local files
- Production: CDN URLs

## Next.js Configuration

The `next.config.ts` includes optimized headers for:
- Images: Long-term caching
- Videos: Long-term caching
- Audio: Long-term caching with proper MIME types

## Build & Deploy

1. **Ensure media files are committed:**
   ```bash
   git status  # Check that public/ files are tracked
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   - Vercel: `vercel deploy`
   - Netlify: `netlify deploy`
   - Or push to your connected repository

## Troubleshooting

If images/videos don't show in production:
1. Verify files are committed: `git ls-files public/`
2. Check file paths match exactly (case-sensitive)
3. Ensure files are in `public/` directory (not `app/` or elsewhere)
4. Clear browser cache and rebuild

