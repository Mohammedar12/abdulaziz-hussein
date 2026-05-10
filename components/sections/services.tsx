"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useGSAP } from "@gsap/react"
import {
  BarChart3,
  Compass,
  GraduationCap,
  LineChart,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

const ICONS: Record<string, LucideIcon> = {
  strategic: Compass,
  operational: Workflow,
  kpi: BarChart3,
  okr: Target,
  training: GraduationCap,
  vision: LineChart,
}

// Asymmetric span pattern for the 6 cards on lg+:
// 7 / 5  |  4 / 4 / 4  |  5 / 7
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5 lg:col-start-1",
]
// Note: last two reorder for visual interest
const SPANS_FINAL = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12",
]

export function Services() {
  const t = useTranslations("services")
  const items = t.raw("items") as Array<{ id: string; title: string; description: string }>
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!root.current) return
      gsap.from(root.current.querySelectorAll("[data-service-card]"), {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      })
      gsap.from(root.current.querySelectorAll("[data-service-head]"), {
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

  return (
    <section id="services" ref={root} className="border-b border-border bg-background py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <div data-service-head className="text-xs uppercase tracking-[0.25em] text-primary">
            {t("eyebrow")}
          </div>
          <h2
            data-service-head
            className="mt-4 font-heading text-foreground"
            style={{ fontSize: "var(--text-2xl)", letterSpacing: "-0.01em" }}
          >
            {t("title")}
          </h2>
          <p data-service-head className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {items.map((item, idx) => {
            const Icon = ICONS[item.id] ?? Compass
            const span = SPANS_FINAL[idx] ?? "lg:col-span-4"
            const number = String(idx + 1).padStart(2, "0")
            return (
              <article
                key={item.id}
                data-service-card
                className={`group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:bg-accent hover:shadow-md md:p-8 ${span}`}
              >
                {/* Top accent line */}
                <span aria-hidden className="absolute inset-x-6 top-0 h-px bg-primary md:inset-x-8" />

                <div className="flex items-start justify-between gap-4">
                  <Icon className="size-7 text-primary" strokeWidth={1.5} />
                  <span className="font-heading text-xs tracking-wider text-muted-foreground">{number}</span>
                </div>

                <h3 className="mt-6 font-heading text-xl text-foreground md:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
