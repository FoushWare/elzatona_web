# Podcast Setup Guide

## Current Status ✅

The Untyped podcast has been successfully scraped from Apple Podcasts and integrated into the website with:

- **8 Real Episodes** from the Untyped podcast
- **Working Audio Player** with play/pause/seek functionality
- **Proper Attribution** to Abdelrahman Awad
- **External Links** to Apple Podcasts and the official website

## Audio Playback Issue 🔧

**Current Issue**: The audio URLs are using sample/demo audio files instead of the actual podcast audio.

**Error**: `Runtime NotSupportedError: Failed to load because no supported source was found.`

## Solution: Getting Real Audio URLs

### Method 1: RSS Feed (Recommended)

1. **Find the RSS Feed URL**:
   - Contact Abdelrahman Awad (host of Untyped podcast)
   - Check the podcast's SoundCloud or hosting platform
   - Look for RSS feed URL in podcast details

2. **Parse the RSS Feed**:

   ```javascript
   // Example RSS feed structure
   <item>
     <title>Merge and Emerge</title>
     <enclosure
       url="https://example.com/audio/merge-and-emerge.mp3"
       type="audio/mpeg"
       length="3600000"
     />
   </item>
   ```

3. **Update Audio URLs**:
   - Replace sample URLs in `src/lib/podcasts.ts`
   - Use the actual audio URLs from the RSS feed

### Method 2: Apple Podcasts Embed

Use Apple's embed player instead of direct audio URLs:

```html
<iframe
  src="https://embed.podcasts.apple.com/us/podcast/untyped/id1695379870"
  height="175"
  frameborder="0"
>
</iframe>
```

### Method 3: SoundCloud Integration

If the podcast is hosted on SoundCloud:

1. Get the SoundCloud track URLs
2. Use SoundCloud's embed player
3. Or extract direct audio URLs from SoundCloud

## Implementation Steps

### Step 1: Update Audio URLs

In `src/lib/podcasts.ts`, replace:

```typescript
audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3';
```

With real audio URLs:

```typescript
audioUrl: 'https://feeds.soundcloud.com/stream/REAL_AUDIO_URL.mp3';
```

### Step 2: Test Audio Playback

1. Open the podcasts page: `http://localhost:3000/podcasts`
2. Click "🎧 Listen Now" on any episode
3. Verify the audio player loads and plays correctly

### Step 3: Handle Errors

The current implementation includes error handling:

```typescript
const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
  console.error('Audio loading error:', e);
  // Show user-friendly error message
};
```

## Current Demo Audio

The website currently uses a working sample audio file (`Kalimba.mp3`) for demonstration purposes. This allows users to:

- Test the audio player functionality
- See the UI/UX design
- Experience the podcast interface

## Legal Considerations

- **Permission**: Ensure you have permission to host the audio files
- **Attribution**: Always credit the original podcast and host
- **Links**: Provide links back to the original source
- **Terms of Service**: Check the podcast's terms of service

## Files Modified

1. `src/lib/podcasts.ts` - Podcast data with real episode information
2. `src/app/podcasts/page.tsx` - Audio player implementation
3. `src/app/api/podcasts/rss/route.ts` - RSS feed API endpoint
4. `src/lib/podcast-utils.ts` - Utility functions for RSS parsing

## Next Steps

1. **Contact Podcast Host**: Reach out to Abdelrahman Awad for RSS feed access
2. **Implement RSS Parser**: Use the utility functions to parse real RSS feeds
3. **Update Audio URLs**: Replace demo URLs with real podcast audio
4. **Test Thoroughly**: Ensure all episodes play correctly
5. **Add More Episodes**: Include additional episodes from the podcast

## Support

For technical issues or questions about the podcast integration, refer to:

- [Apple Podcasts Embed Documentation](https://podcasters.apple.com/support/889-apple-podcasts-embed-player)
- [RSS Feed Specification](https://cyber.harvard.edu/rss/rss.html)
- [HTML5 Audio API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)

---

**Note**: This is a demo implementation. For production use, you need to obtain the actual RSS feed and audio URLs from the podcast host.
