"use client"

import { useTranslations } from "next-intl"
import { Quote } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

export function Testimonials() {
  const t = useTranslations("testimonials")
  const revealRef = useReveal<HTMLElement>()

  const items = [
    {
      quote: t("items.0.quote"),
      name: t("items.0.name"),
      title: t("items.0.title"),
      org: t("items.0.org"),
    },
    {
      quote: t("items.1.quote"),
      name: t("items.1.name"),
      title: t("items.1.title"),
      org: t("items.1.org"),
    },
    {
      quote: t("items.2.quote"),
      name: t("items.2.name"),
      title: t("items.2.title"),
      org: t("items.2.org"),
    },
  ]

  return (
    <section
      ref={revealRef}
      id="testimonials"
      className="py-24 lg:py-32 bg-surface border-t border-border"
      data-reveal
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="mb-12 lg:mb-16 text-center" data-reveal>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            {t("title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              data-reveal
              style={{ transitionDelay: `${idx * 120}ms` }}
              className="bg-card border border-border rounded-xl p-6 lg:p-8 flex flex-col"
            >
              <Quote className="w-10 h-10 text-primary mb-4 shrink-0" />
              <blockquote className="text-foreground leading-relaxed flex-1 mb-6">
                {item.quote}
              </blockquote>
              <footer className="border-t border-border pt-4 mt-auto">
                <p className="text-foreground font-medium">{item.name}</p>
                <p className="text-muted-foreground text-sm">
                  {item.title}, {item.org}
                </p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
