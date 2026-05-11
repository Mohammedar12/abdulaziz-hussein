"use client"

import { MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function FloatingWhatsApp() {
  const t = useTranslations("common")

  return (
    <a
      href="https://wa.me/966556361166"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappLabel")}
      className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform floating-whatsapp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">{t("whatsappLabel")}</span>
    </a>
  )
}
