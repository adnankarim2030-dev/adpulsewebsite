import { NextResponse } from 'next/server';

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
    
    // Parse using Regex to avoid requiring external packages on cPanel
    const videos = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    
    while ((match = entryRegex.exec(xmlData)) !== null) {
      const entryContent = match[1];
      
      const idMatch = entryContent.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
      
      if (idMatch && titleMatch) {
        videos.push({
          id: idMatch[1],
          title: titleMatch[1],
          category: 'OTHER'
        });
      }
    }

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error in YouTube API route:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
