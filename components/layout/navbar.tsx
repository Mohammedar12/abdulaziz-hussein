"use client"

import { useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useGSAP } from "@gsap/react"
import { Menu, X, MessageCircle, Globe } from "lucide-react"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { Link, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "#hero", key: "home" },
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#clients", key: "clients" },
  { href: "#courses", key: "courses" },
  { href: "#contact", key: "contact" },
] as const

const WHATSAPP_URL = "https://wa.me/966556361166"

export function Navbar() {
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const locale = useLocale()
  const pathname = usePathname()
  const navRef = useRef<HTMLElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      if (!navRef.current) return
      const el = navRef.current
      const trigger = ScrollTrigger.create({
        start: 80,
        end: 99999,
        toggleClass: { className: "is-scrolled", targets: el },
      })
      return () => trigger.kill()
    },
    { scope: navRef },
  )

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return
      if (open) {
        gsap.fromTo(
          mobileMenuRef.current,
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
        )
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll("[data-mobile-link]"),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.05 },
        )
      }
    },
    { dependencies: [open] },
  )

  const otherLocale = locale === "ar" ? "en" : "ar"

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        "[&.is-scrolled]:bg-surface/90 [&.is-scrolled]:backdrop-blur-md [&.is-scrolled]:border-b [&.is-scrolled]:border-border",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-heading text-base font-semibold tracking-tight text-foreground md:text-lg">
            {t("logo")}
          </span>
          <span className="text-xs text-muted-foreground">{t("logoSub")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={pathname}
            locale={otherLocale}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Globe className="size-4" />
            {t("languageToggle")}
          </Link>
          <Button asChild size="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              {tCommon("whatsappLabel")}
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          aria-label={open ? t("close") : t("menu")}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          className="border-t border-border bg-surface/95 backdrop-blur-md lg:hidden"
        >
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-6 md:px-8" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                data-mobile-link
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t(item.key)}
              </a>
            ))}
            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              <Link
                href={pathname}
                locale={otherLocale}
                data-mobile-link
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground"
              >
                <Globe className="size-4" />
                {t("languageToggle")}
              </Link>
              <Button asChild size="default" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <a data-mobile-link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  {tCommon("whatsappLabel")}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
