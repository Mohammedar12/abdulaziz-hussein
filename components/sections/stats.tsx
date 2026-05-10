"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"

export function Stats() {
  const t = useTranslations("stats")
  const items = t.raw("items") as Array<{ value: number; suffix: string; label: string }>
  const root = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const numberEls = Array.from(el.querySelectorAll<HTMLElement>("[data-stat-number]"))
    if (numberEls.length === 0) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      numberEls.forEach((node) => {
        node.textContent = node.dataset.value ?? "0"
      })
      return
    }

    const animate = (node: HTMLElement) => {
      const target = Number(node.dataset.value || "0")
      const duration = 1600
      const start = performance.now()
      const ease = (t: number) => 1 - Math.pow(1 - t, 3)
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        node.textContent = String(Math.round(target * ease(p)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )

    numberEls.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section id="stats" ref={root} className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border-border ltr:md:border-l rtl:md:border-r ltr:md:first:border-l-0 rtl:md:first:border-r-0 md:px-6 md:first:ps-0"
            >
              <div
                className="flex items-baseline gap-1 font-heading text-primary"
                style={{ fontSize: "var(--text-2xl)" }}
              >
                <span data-stat-number data-value={item.value}>
                  0
                </span>
                <span>{item.suffix}</span>
              </div>
              <div className="mt-3 text-sm text-muted-foreground md:text-base">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
