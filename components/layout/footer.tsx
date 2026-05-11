import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { MessageCircle, Mail, Phone } from "lucide-react"

export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const tServices = useTranslations("services")
  const tCommon = useTranslations("common")

  const quickLinks = [
    { label: tNav("home"), href: "#" },
    { label: tNav("about"), href: "#about" },
    { label: tNav("services"), href: "#services" },
    { label: tNav("clients"), href: "#clients" },
    { label: tNav("contact"), href: "#contact" },
  ]

  const services = [
    tServices("items.0.title"),
    tServices("items.1.title"),
    tServices("items.2.title"),
    tServices("items.3.title"),
  ]

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-foreground font-heading font-semibold text-lg mb-2">
              {t("name")}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t("title")}
            </p>
            <p className="text-muted-foreground text-xs">
              {t("certLine")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-medium mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-medium mb-4">
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-2">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href="#services"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-medium mb-4">
              {t("contactTitle")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${tCommon("phone").replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {tCommon("phone")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {t("email")}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/966556361166"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {tCommon("whatsappLabel")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
