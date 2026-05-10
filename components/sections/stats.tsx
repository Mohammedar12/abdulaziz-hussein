"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useGSAP } from "@gsap/react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

export function Stats() {
  const t = useTranslations("stats")
  const items = t.raw("items") as Array<{ value: number; suffix: string; label: string }>
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!root.current) return
      const numberEls = root.current.querySelectorAll<HTMLElement>("[data-stat-number]")

      numberEls.forEach((el) => {
        const target = Number(el.dataset.value || "0")
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val))
          },
        })
      })

      gsap.from(root.current.querySelectorAll("[data-stat-item]"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          once: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section id="stats" ref={root} className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              data-stat-item
              className="border-border ltr:md:border-l rtl:md:border-r ltr:md:first:border-l-0 rtl:md:first:border-r-0 md:px-6 md:first:ps-0"
            >
              <div className="flex items-baseline gap-1 font-heading text-primary" style={{ fontSize: "var(--text-2xl)" }}>
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
