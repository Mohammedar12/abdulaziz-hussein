"use client";

import { useEffect, useState, useCallback } from "react";
import type { YouTubeVideo } from "@/app/api/youtube/route";

// ── helpers ──────────────────────────────────────────────────────────────────

function formatViews(n: string): string {
  const num = parseInt(n, 10);
  if (isNaN(num)) return "0";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}م`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}ك`;
  return num.toString();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── VideoModal ────────────────────────────────────────────────────────────────

function VideoModal({
  video,
  onClose,
}: {
  video: YouTubeVideo;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 left-0 text-white/70 hover:text-white text-sm"
          aria-label="إغلاق"
        >
          ✕ إغلاق
        </button>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <div className="mt-4 text-right" dir="rtl">
          <h3 className="text-white font-semibold text-lg leading-snug">
            {video.title}
          </h3>
          <p className="text-white/50 text-sm mt-1">
            {formatViews(video.viewCount)} مشاهدة ·{" "}
            {formatDate(video.publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── VideoCard ─────────────────────────────────────────────────────────────────

function VideoCard({
  video,
  onClick,
}: {
  video: YouTubeVideo;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      dir="rtl"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-xl aspect-video bg-neutral-900">
        {video.thumbnail && (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0.4,
          }}
        >
          {/* Play button */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? "#c9a84c" : "rgba(255,255,255,0.2)",
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-white"
              style={{ marginRight: "-2px" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <span
            className="absolute bottom-2 left-2 text-xs text-white px-1.5 py-0.5 rounded font-mono"
            style={{ background: "rgba(0,0,0,0.75)" }}
          >
            {video.duration}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="mt-3 space-y-1">
        <h3
          className="text-sm font-medium leading-snug line-clamp-2 transition-colors duration-200"
          style={{ color: hovered ? "#c9a84c" : "#f0ece4" }}
        >
          {video.title}
        </h3>
        <p className="text-xs" style={{ color: "#888" }}>
          {formatViews(video.viewCount)} مشاهدة ·{" "}
          {formatDate(video.publishedAt)}
        </p>
      </div>
    </article>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

interface VideoSectionProps {
  /** Override section title */
  title?: string;
  /** Max videos per page */
  perPage?: number;
  /** Section class override */
  className?: string;
}

export default function VideoSection({
  title = "المحتوى",
  perPage = 6,
  className = "",
}: VideoSectionProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  const fetchVideos = useCallback(
    async (pageToken?: string) => {
      try {
        const params = new URLSearchParams({ maxResults: String(perPage) });
        if (pageToken) params.set("pageToken", pageToken);

        const res = await fetch(`/api/youtube?${params}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);

        if (pageToken) {
          setVideos((prev) => [...prev, ...data.videos]);
        } else {
          setVideos(data.videos);
        }
        setNextPageToken(data.nextPageToken);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [perPage],
  );

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const loadMore = () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    fetchVideos(nextPageToken);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <section
        className={`w-full py-16 px-4 ${className}`}
        dir="rtl"
        aria-label={title}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className="w-1 h-8 rounded-full"
              style={{
                background: "linear-gradient(to bottom, #c9a84c, #8b6914)",
              }}
            />
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#f0ece4" }}
            >
              {title}
            </h2>
          </div>

          {/* States */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div
                    className="aspect-video rounded-xl"
                    style={{ background: "#2a2620" }}
                  />
                  <div
                    className="h-3 rounded mt-3 w-3/4"
                    style={{ background: "#2a2620" }}
                  />
                  <div
                    className="h-3 rounded mt-2 w-1/2"
                    style={{ background: "#2a2620" }}
                  />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div
              className="text-center py-12 rounded-xl border"
              style={{ borderColor: "#3a2a10", background: "#1c1814" }}
            >
              <p className="text-red-400 text-sm">{error}</p>
              <p className="text-white/40 text-xs mt-2">
                تأكد من إضافة YOUTUBE_API_KEY في .env.local
              </p>
            </div>
          )}

          {!loading && !error && videos.length === 0 && (
            <p className="text-center py-12" style={{ color: "#888" }}>
              لا توجد فيديوهات حتى الآن.
            </p>
          )}

          {/* Video grid */}
          {!loading && !error && videos.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setActiveVideo(video)}
                  />
                ))}
              </div>

              {/* Load more */}
              {nextPageToken && (
                <div className="mt-10 text-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200"
                    style={{
                      background: loadingMore ? "#2a2620" : "transparent",
                      border: "1px solid #c9a84c",
                      color: "#c9a84c",
                    }}
                  >
                    {loadingMore ? "جارٍ التحميل..." : "تحميل المزيد"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
