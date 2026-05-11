"use client"

import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReveal } from "@/hooks/use-reveal"

const statusColors: Record<string, string> = {
  open: "bg-primary",
  soon: "bg-secondary",
  progress: "bg-muted-foreground",
  rd: "bg-muted-foreground",
}

export function CurrentWork() {
  const t = useTranslations("currentWork")
  const revealRef = useReveal<HTMLElement>()

  const items = [
    { title: t("items.0.title"), status: t("items.0.status"), statusType: "open", cta: t("items.0.cta") },
    { title: t("items.1.title"), status: t("items.1.status"), statusType: "soon" },
    { title: t("items.2.title"), status: t("items.2.status"), statusType: "progress" },
    { title: t("items.3.title"), status: t("items.3.status"), statusType: "rd" },
  ]

  return (
    <section
      ref={revealRef}
      id="current-work"
      className="py-24 lg:py-32 border-t border-border"
      data-reveal
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="mb-12 lg:mb-16" data-reveal>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              data-reveal
              style={{ transitionDelay: `${idx * 100}ms` }}
              className="group bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    "w-3 h-3 rounded-full mt-1.5 shrink-0",
                    statusColors[item.statusType]
                  )}
                />
                <div>
                  <h3 className="text-foreground font-medium text-lg">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.status}
                  </p>
                </div>
              </div>

              {item.cta && (
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline underline-offset-4 shrink-0"
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
