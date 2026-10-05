import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export const revalidate = 0; // Disable cache so it's always fresh

export async function GET() {
  try {
    const channelId = 'UCJfBhcCIDi1nuhFsdvqQLcg';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    // Use an aggressive no-cache fetch
    const response = await fetch(rssUrl, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }

    const xmlData = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    
    const result = parser.parse(xmlData);
    const entries = result?.feed?.entry || [];
    
    // Ensure it's always an array even if 1 video
    const videosArray = Array.isArray(entries) ? entries : [entries];
    
    const videos = videosArray.map(entry => {
      return {
        id: entry['yt:videoId'],
        title: entry.title,
        category: 'OTHER' // Default
      };
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error in YouTube API route:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
