import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageCircle, Mail, Phone, Youtube, Linkedin } from "lucide-react";
export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tCommon = useTranslations("common");

  const quickLinks = [
    { label: tNav("home"), href: "#" },
    { label: tNav("about"), href: "#about" },
    { label: tNav("services"), href: "#services" },
    { label: tNav("clients"), href: "#clients" },
    { label: tNav("contact"), href: "#contact" },
  ];

  const services = [
    tServices("items.0.title"),
    tServices("items.1.title"),
    tServices("items.2.title"),
    tServices("items.3.title"),
  ];

  function TikTokIcon({ className }: { className?: string }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    );
  }

  function SnapchatIcon({ className }: { className?: string }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 2C9.33 2 7.23 3.37 6.19 5.56c-.47.99-.4 2.66-.35 3.79l-.01.06c-.32.06-.68.1-1.07.1-.52 0-.87-.13-.87-.13s.1.67.93 1.04c-.23.38-.72.55-1.32.6 0 0 .26.59 1.44.8.06.11.13.66-.26 1.24 0 0 .44.05 1.09-.33.66.89 2.02 1.97 4.09 2.28.02.01.02.02 0 .03-.3.23-1.03.49-2.47.49-.16 0-.32 0-.49-.01-.19.38-.21.77-.21.77s3.14 1.01 4.65 1.81c.27.14.46.42.46.74V21s.77-.34 1.51-.34c.74 0 1.51.34 1.51.34v-2.91c0-.32.19-.6.46-.74 1.51-.8 4.65-1.81 4.65-1.81s-.02-.39-.21-.77c-.17.01-.33.01-.49.01-1.44 0-2.17-.26-2.47-.49-.02-.01-.02-.02 0-.03 2.07-.31 3.43-1.39 4.09-2.28.65.38 1.09.33 1.09.33-.39-.58-.32-1.13-.26-1.24 1.18-.21 1.44-.8 1.44-.8-.6-.05-1.09-.22-1.32-.6.83-.37.93-1.04.93-1.04s-.35.13-.87.13c-.39 0-.75-.04-1.07-.1l-.01-.06c.05-1.13.12-2.8-.35-3.79C16.787 3.37 14.687 2 12 2h.017z" />
      </svg>
    );
  }

  const socialLinks = [
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@aziz.strategy.lab?_t=ZS-8vL4u16neBG&_r=1",
      icon: <TikTokIcon className="w-4 h-4" />,
    },
    {
      label: "Snapchat",
      href: "https://t.snapchat.com/uPdpOzz4",
      icon: <SnapchatIcon className="w-4 h-4" />,
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@abdulazizhussein5132?si=O0KSL1KuWIko_hZn",
      icon: <Youtube className="w-4 h-4" />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdulaziz-hussein-69a53818",
      icon: <Linkedin className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-foreground font-heading font-semibold text-lg mb-2">
              {t("name")}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{t("title")}</p>
            <p className="text-muted-foreground text-xs">{t("certLine")}</p>
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

          {/* Social Media */}
          <div>
            <h4 className="text-foreground font-medium mb-4">قنوات التواصل</h4>

            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {social.icon}
                    <span>{social.label}</span>
                  </a>
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
          <p className="text-muted-foreground text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
