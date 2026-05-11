"use client"

import { useTranslations } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useReveal } from "@/hooks/use-reveal"

export function FAQ() {
  const t = useTranslations("faq")
  const revealRef = useReveal<HTMLElement>()

  const items = [
    { q: t("items.0.q"), a: t("items.0.a") },
    { q: t("items.1.q"), a: t("items.1.a") },
    { q: t("items.2.q"), a: t("items.2.a") },
    { q: t("items.3.q"), a: t("items.3.a") },
    { q: t("items.4.q"), a: t("items.4.a") },
  ]

  return (
    <section
      ref={revealRef}
      id="faq"
      className="py-24 lg:py-32 border-t border-border"
      data-reveal
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <div className="mb-12 lg:mb-16 text-center" data-reveal>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            {t("title")}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              data-reveal
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:bg-surface-2 transition-colors"
            >
              <AccordionTrigger className="text-foreground font-medium text-left py-5 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
