"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";

import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/966556361166";

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
      gsap.set(targets, { opacity: 0, y: 30 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.15,
      });

      gsap.fromTo(
        "[data-hero-photo]",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.4 },
      );

      gsap.to("[data-hero-arrow]", {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative isolate flex min-h-screen items-center overflow-hidden border-b border-border pt-28 pb-20"
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Left: text */}
        <div className="lg:col-span-7">
          <div
            data-hero-reveal
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-primary md:text-sm"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {t("roleChip")}
          </div>

          <h1
            data-hero-reveal
            className="mt-6 font-heading text-foreground"
            style={{
              fontSize: "var(--text-hero)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {t("name")}
          </h1>

          <p
            data-hero-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t("tagline")}
          </p>

          <div
            data-hero-reveal
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                {tCommon("bookConsultation")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border bg-transparent px-6 text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <a href="#about">
                {tCommon("learnMore")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </a>
            </Button>
          </div>

          <div
            data-hero-reveal
            className="mt-12 grid max-w-md grid-cols-3 divide-x divide-border rounded-lg border border-border bg-surface/40 rtl:divide-x-reverse"
          >
            <div className="px-5 py-4">
              <div className="font-heading text-xl text-primary">20+</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t("yearsLabel")}
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="font-heading text-xl text-primary">13</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Certifications
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="font-heading text-xl text-primary">8</div>
              <div className="mt-1 text-xs text-muted-foreground">Sectors</div>
            </div>
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative lg:col-span-5">
          <div
            data-hero-photo
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl border border-primary/40 bg-surface shadow-lg"
          >
            <div className="absolute inset-0 ring-1 ring-inset ring-primary/20" />
            <Image
              src="/images/mazen-portrait2.jpg"
              alt={t("imageAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="object-cover"
            />
            {/* Bottom credential strip */}
            <div className="absolute inset-x-0 bottom-0 border-t border-primary/30 bg-background/85 px-5 py-4 backdrop-blur-md">
              <div className="font-heading text-sm text-foreground">
                MBA · PMP · 6σ MBB
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                C-KPIP · C-OKRP · C-SBP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        aria-label={tCommon("scrollHint")}
      >
        <span>{tCommon("scrollHint")}</span>
        <span
          data-hero-arrow
          className="inline-flex size-8 items-center justify-center rounded-full border border-border"
        >
          <ArrowDown className="size-4" />
        </span>
      </a>
    </section>
  );
}
