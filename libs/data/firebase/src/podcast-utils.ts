/**
 * Utility functions for podcast management and RSS feed parsing
 */

export interface RSSEpisode {
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  enclosure: {
    url: string;
    type: string;
    length: string;
  };
  guid: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  language: string;
  copyright: string;
  managingEditor: string;
  webMaster: string;
  lastBuildDate: string;
  category: string;
  generator: string;
  image: {
    url: string;
    title: string;
    link: string;
  };
  items: RSSEpisode[];
}

/**
 * Parse RSS feed XML and extract podcast episodes
 * This is a simplified parser - in production, you'd want to use a proper XML parser
 */
export function parseRSSFeed(xmlContent: string): RSSFeed | null {
  try {
    // This is a simplified implementation
    // In a real application, you'd use a proper XML parser like 'xml2js' or 'fast-xml-parser'

    const episodes: RSSEpisode[] = [];

    // Extract basic feed information
    const titleMatch = xmlContent.match(
      /<title><!\[CDATA\[(.*?)\]\]><\/title>/
    );
    const descriptionMatch = xmlContent.match(
      /<description><!\[CDATA\[(.*?)\]\]><\/description>/
    );
    const linkMatch = xmlContent.match(/<link>(.*?)<\/link>/);

    return {
      title: titleMatch ? titleMatch[1] : 'Unknown Podcast',
      description: descriptionMatch ? descriptionMatch[1] : '',
      link: linkMatch ? linkMatch[1] : '',
      language: 'en',
      copyright: '',
      managingEditor: '',
      webMaster: '',
      lastBuildDate: new Date().toISOString(),
      category: 'Technology',
      generator: 'Custom RSS Parser',
      image: {
        url: '',
        title: '',
        link: '',
      },
      items: episodes,
    };
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return null;
  }
}

/**
 * Get the actual RSS feed URL for Untyped podcast
 * This would need to be obtained from the podcast host (SoundCloud, etc.)
 */
export function getUntypedRSSUrl(): string {
  // The actual RSS feed URL would be something like:
  // https://feeds.soundcloud.com/users/soundcloud:users:USER_ID/sounds.rss
  // or
  // https://anchor.fm/s/USER_ID/podcast/rss

  // For now, return a placeholder
  return 'https://feeds.soundcloud.com/users/soundcloud:users:1234567890/sounds.rss';
}

/**
 * Instructions for getting real podcast audio URLs
 */
export const PODCAST_SETUP_INSTRUCTIONS = `
To get real podcast audio URLs for the Untyped podcast:

1. **Find the RSS Feed URL:**
   - Visit the podcast on Apple Podcasts: https://podcasts.apple.com/us/podcast/untyped/id1695379870
   - Look for the RSS feed URL (usually in the podcast details)
   - Or contact the podcast host (Abdelrahman Awad) for the RSS feed URL

2. **Parse the RSS Feed:**
   - The RSS feed contains <enclosure> tags with direct audio URLs
   - Each episode will have a direct MP3/audio file URL
   - Example: <enclosure url="https://example.com/episode1.mp3" type="audio/mpeg" length="3600000"/>

3. **Update the Podcast Data:**
   - Replace the placeholder audio URLs in src/lib/podcasts.ts
   - Use the actual audio URLs from the RSS feed
   - Update the episode information with real data

4. **Alternative: Use Apple Podcasts Embed:**
   - Use Apple's embed player for each episode
   - This doesn't require direct audio URLs
   - Example: <iframe src="https://embed.podcasts.apple.com/us/podcast/untyped/id1695379870" height="175" frameborder="0"></iframe>

5. **Legal Considerations:**
   - Ensure you have permission to host the audio files
   - Consider using the podcast's official embed players
   - Link back to the original podcast source
`;

/**
 * Sample RSS feed structure for reference
 */
export const SAMPLE_RSS_STRUCTURE = `
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Untyped</title>
    <description>نصف ساعه اسبوعيا من الهبد في مجال الفرونت ايند والجافاسكربت بالعربي</description>
    <link>https://untyped.fm</link>
    <language>ar</language>
    <copyright>© Abdelrahman Awad</copyright>
    <managingEditor>contact@untyped.fm</managingEditor>
    <webMaster>contact@untyped.fm</webMaster>
    <lastBuildDate>Mon, 01 Jan 2025 00:00:00 GMT</lastBuildDate>
    <category>Technology</category>
    <generator>SoundCloud</generator>
    <image>
      <url>https://example.com/podcast-image.jpg</url>
      <title>Untyped</title>
      <link>https://untyped.fm</link>
    </image>
    
    <item>
      <title>Merge and Emerge</title>
      <description>عايز تبدأ تساهم في الـ open source ومش عارف منين؟</description>
      <pubDate>Mon, 01 Jan 2025 00:00:00 GMT</pubDate>
      <guid>https://untyped.fm/episodes/merge-and-emerge</guid>
      <enclosure url="https://example.com/audio/merge-and-emerge.mp3" type="audio/mpeg" length="3600000"/>
      <duration>36:00</duration>
    </item>
    
    <!-- More episodes... -->
  </channel>
</rss>
`;
