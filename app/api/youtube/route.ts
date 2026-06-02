// app/api/youtube/route.ts
import { NextResponse } from "next/server";

const CHANNEL_ID = "UCNibOu53e9UCVA_4w1usVqQ";
// Uploads playlist = replace "UC" prefix with "UU"
const UPLOADS_PLAYLIST_ID = "UUNibOu53e9UCVA_4w1usVqQ";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  duration: string; // ISO 8601 e.g. "PT5M30S"
  url: string;
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const h = match[1] ? `${match[1]}:` : "";
  const m = match[2] ? match[2].padStart(h ? 2 : 1, "0") : "0";
  const s = (match[3] || "0").padStart(2, "0");
  return `${h}${m}:${s}`;
}

export async function GET(request: Request) {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YOUTUBE_API_KEY is not set in .env.local" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const maxResults = searchParams.get("maxResults") || "50";
  const pageToken = searchParams.get("pageToken") || "";

  try {
    // Step 1: Get video IDs from uploads playlist
    const playlistUrl = new URL(
      "https://www.googleapis.com/youtube/v3/playlistItems",
    );
    playlistUrl.searchParams.set("part", "contentDetails,snippet");
    playlistUrl.searchParams.set("playlistId", UPLOADS_PLAYLIST_ID);
    playlistUrl.searchParams.set("maxResults", maxResults);
    playlistUrl.searchParams.set("key", apiKey);
    if (pageToken) playlistUrl.searchParams.set("pageToken", pageToken);

    const playlistRes = await fetch(playlistUrl.toString());
    const playlistData = await playlistRes.json();

    if (playlistData.error) {
      return NextResponse.json(
        { error: playlistData.error.message },
        { status: 400 },
      );
    }

    const items = playlistData.items || [];
    const videoIds = items
      .map((item: any) => item.contentDetails.videoId)
      .join(",");

    if (!videoIds) {
      return NextResponse.json({
        videos: [],
        nextPageToken: null,
        totalResults: 0,
      });
    }

    // Step 2: Get video statistics and content details
    const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    videosUrl.searchParams.set("part", "snippet,statistics,contentDetails");
    videosUrl.searchParams.set("id", videoIds);
    videosUrl.searchParams.set("key", apiKey);

    const videosRes = await fetch(videosUrl.toString());
    const videosData = await videosRes.json();

    const videos: YouTubeVideo[] = (videosData.items || []).map((v: any) => ({
      id: v.id,
      title: v.snippet.title,
      description: v.snippet.description,
      thumbnail:
        v.snippet.thumbnails?.maxres?.url ||
        v.snippet.thumbnails?.high?.url ||
        v.snippet.thumbnails?.medium?.url,
      publishedAt: v.snippet.publishedAt,
      viewCount: v.statistics?.viewCount || "0",
      likeCount: v.statistics?.likeCount || "0",
      duration: parseDuration(v.contentDetails?.duration || ""),
      url: `https://www.youtube.com/watch?v=${v.id}`,
    }));

    return NextResponse.json({
      videos,
      nextPageToken: playlistData.nextPageToken || null,
      totalResults: playlistData.pageInfo?.totalResults || videos.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
