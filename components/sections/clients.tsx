"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useGSAP } from "@gsap/react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

export function Clients() {
  const t = useTranslations("clients")
  const row1 = t.raw("row1") as string[]
  const row2 = t.raw("row2") as string[]
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!root.current) return
      gsap.from(root.current.querySelectorAll("[data-clients-head]"), {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      })
    },
    { scope: root },
  )

  const renderRow = (items: string[], reverse = false) => {
    const loop = [...items, ...items]
    return (
      <div
        className="marquee-pause relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className={`${reverse ? "marquee-track-reverse" : "marquee-track"} flex w-max gap-3`}>
          {loop.map((name, idx) => (
            <span
              key={`${name}-${idx}`}
              className="inline-flex items-center whitespace-nowrap rounded-full border border-border bg-muted px-5 py-2.5 text-sm text-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section
      id="clients"
      ref={root}
      className="border-b border-border bg-surface py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <div data-clients-head className="text-xs uppercase tracking-[0.25em] text-primary">
            {t("eyebrow")}
          </div>
          <h2
            data-clients-head
            className="mt-4 font-heading text-foreground"
            style={{ fontSize: "var(--text-2xl)", letterSpacing: "-0.01em" }}
          >
            {t("title")}
          </h2>
          <p data-clients-head className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        {renderRow(row1, false)}
        {renderRow(row2, true)}
      </div>
    </section>
  )
}
