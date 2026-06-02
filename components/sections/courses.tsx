"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useReveal } from "@/hooks/use-reveal";
import { ChevronLeft, ChevronRight, ExternalLink, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * COURSES DATA
 * ─────────────────────────────────────────────────────────
 * Replace each `youtubeId` with the real ID from YouTube.
 * The ID is the part after "v=" in the URL:
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
 */
const COURSES = [
  {
    num: "01",
    youtubeId: "VQBTAkTrNaI",
    titleKey: "items.0.title",
    descKey: "items.0.desc",
    tagKey: "items.0.tag",
    watchKey: "items.0.watch",
  },
  {
    num: "02",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    titleKey: "items.1.title",
    descKey: "items.1.desc",
    tagKey: "items.1.tag",
    watchKey: "items.1.watch",
  },
  {
    num: "03",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    titleKey: "items.2.title",
    descKey: "items.2.desc",
    tagKey: "items.2.tag",
    watchKey: "items.2.watch",
  },
  {
    num: "04",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    titleKey: "items.3.title",
    descKey: "items.3.desc",
    tagKey: "items.3.tag",
    watchKey: "items.3.watch",
  },
];

export function Courses() {
  const t = useTranslations("courses");
  const revealRef = useReveal<HTMLElement>();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const total = COURSES.length;

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  // In RTL, swipe right-to-left still feels like "forward"
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48) {
      delta > 0 ? next() : prev();
    }
  };

  return (
    <section
      ref={revealRef}
      id="courses"
      className="border-t border-border py-24 lg:py-32"
      data-reveal
    >
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Header ──────────────────────────────────────── */}
        <div
          className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div>
            <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-primary">
              {t("eyebrow")}
            </span>
            <h2 className="font-heading text-2xl font-semibold text-foreground lg:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground lg:text-lg">
              {t("subtitle")}
            </p>
          </div>

          {/* Counter — top-right on desktop */}
          <div className="shrink-0 font-mono text-sm text-muted-foreground">
            <span className="text-foreground">
              {String(current + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* ── Carousel ────────────────────────────────────── */}
        <div className="relative" data-reveal>
          {/* Track */}
          <div
            className="overflow-hidden rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {COURSES.map((course, idx) => (
                <article
                  key={course.num}
                  className="min-w-full overflow-hidden border border-border bg-card"
                  aria-hidden={idx !== current}
                >
                  {/* Gold top accent line */}
                  <div className="h-px w-full bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />

                  {/* YouTube embed */}
                  <div className="relative aspect-video bg-surface-2">
                    {/* Only render iframes for current ±1 to avoid unnecessary network requests */}
                    {Math.abs(idx - current) <= 1 && (
                      <iframe
                        src={`https://www.youtube.com/embed/${course.youtubeId}?rel=0&modestbranding=1&color=white`}
                        title={course.titleKey}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 h-full w-full"
                      />
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6 lg:p-8">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5">
                        <Youtube className="size-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          {course.tagKey}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {course.num}
                      </span>
                    </div>

                    <h3 className="mb-2 font-heading text-lg font-semibold text-foreground lg:text-xl">
                      {course.titleKey}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                      {t(course.descKey)}
                    </p>

                    <a
                      href={`https://www.youtube.com/watch?v=${course.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {t(course.watchKey)}
                      <ExternalLink className="size-3 rtl:rotate-180" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ── Navigation bar ──────────────────────────── */}
          <div className="mt-6 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {COURSES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Course ${idx + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === current
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-border hover:bg-muted-foreground",
                  )}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={isRTL ? next : prev}
                disabled={!isRTL && current === 0}
                aria-label={t("prevAriaLabel")}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors",
                  current === 0 && !isRTL
                    ? "cursor-not-allowed text-muted/40"
                    : "text-muted-foreground hover:border-primary/50 hover:text-primary",
                )}
              >
                <ChevronLeft className="size-5 rtl:rotate-180" />
              </button>

              <button
                onClick={isRTL ? prev : next}
                disabled={!isRTL && current === total - 1}
                aria-label={t("nextAriaLabel")}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors",
                  current === total - 1 && !isRTL
                    ? "cursor-not-allowed text-muted/40"
                    : "text-muted-foreground hover:border-primary/50 hover:text-primary",
                )}
              >
                <ChevronRight className="size-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <div className="mt-12 text-center" data-reveal>
          <a
            href="https://www.youtube.com/@REPLACE_WITH_YOUR_CHANNEL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Youtube className="size-4 text-primary" />
            {t("viewAll")}
          </a>
        </div>
      </div>
    </section>
  );
}
