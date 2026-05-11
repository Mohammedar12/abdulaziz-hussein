"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Award, Languages } from "lucide-react";

import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";

export function About() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const root = useReveal<HTMLElement>({ staggerMs: 90 });
  const languages = t.raw("languageList") as string[];

  return (
    <section
      id="about"
      ref={root}
      className="border-b border-border bg-background py-24 md:py-32"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Photo + meta cards */}
        <div className="lg:col-span-5">
          <div
            data-reveal
            className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-surface"
          >
            <Image
              src="/images/mazen-portrait2.jpg"
              alt={t("title")}
              fill
              sizes="(min-width: 1024px) 32rem, 80vw"
              className="object-cover"
            />
          </div>

          <div data-reveal className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Award className="size-4 text-primary" />
                Experience
              </div>
              <div className="mt-3 font-heading text-2xl text-foreground">
                {t("experienceLabel")}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t("experienceSub")}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Languages className="size-4 text-primary" />
                {t("languages")}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-foreground"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-7">
          <div
            data-reveal
            className="text-xs uppercase tracking-[0.25em] text-primary"
          >
            {t("eyebrow")}
          </div>
          <h2
            data-reveal
            className="mt-4 font-heading text-foreground"
            style={{ fontSize: "var(--text-2xl)", letterSpacing: "-0.01em" }}
          >
            {t("title")}
          </h2>

          <p
            data-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t("lead")}
          </p>
          <p
            data-reveal
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            {t("body")}
          </p>

          <div
            data-reveal
            className="mt-8 rounded-lg border-l-2 border-primary bg-surface/60 p-5 rtl:border-l-0 rtl:border-r-2"
          >
            <div className="text-xs uppercase tracking-wider text-primary">
              Vision 2030
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground md:text-base">
              {t("vision")}
            </p>
          </div>

          <div data-reveal className="mt-10">
            <Button
              asChild
              size="lg"
              className="bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              <a href="#contact">
                {tCommon("contactMe")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
