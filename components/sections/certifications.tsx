"use client"

import { useTranslations } from "next-intl"

export function Certifications() {
  const t = useTranslations("certs")
  const items = t.raw("items") as string[]
  // Duplicate the list once so the marquee loops seamlessly with translateX(-50%).
  const loop = [...items, ...items]

  return (
    <section className="relative border-b border-border bg-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("label")}</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div
          className="marquee-pause relative mt-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max gap-3" aria-hidden={false}>
            {loop.map((cert, idx) => (
              <span
                key={`${cert}-${idx}`}
                className="inline-flex items-center rounded-full bg-secondary px-5 py-2 font-heading text-sm font-semibold tracking-wide text-secondary-foreground"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
