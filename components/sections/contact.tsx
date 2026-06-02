"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Send, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  org: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  language: "ar" | "en";
};

export function Contact() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const revealRef = useReveal<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      language: "ar",
    },
  });

  const serviceOptions = [
    t("form.serviceOptions.0"),
    t("form.serviceOptions.1"),
    t("form.serviceOptions.2"),
    t("form.serviceOptions.3"),
    t("form.serviceOptions.4"),
    t("form.serviceOptions.5"),
    t("form.serviceOptions.6"),
  ];

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    console.log("[v0] Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  const selectedLanguage = watch("language");

  return (
    <section
      ref={revealRef}
      id="contact"
      className="py-24 lg:py-32 bg-surface border-t border-border"
      data-reveal
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <div className="mb-12 lg:mb-16 text-center" data-reveal>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {submitted ? (
          <div
            data-reveal
            className="bg-card border border-border rounded-2xl p-12 text-center"
          >
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <p className="text-foreground text-lg">{t("success")}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-border rounded-2xl p-8 lg:p-10"
            data-reveal
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  placeholder={t("form.namePlaceholder")}
                  {...register("name", { required: true })}
                  className={cn(errors.name && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="org">{t("form.org")}</Label>
                <Input
                  id="org"
                  placeholder={t("form.orgPlaceholder")}
                  {...register("org")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("form.phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("form.phonePlaceholder")}
                  {...register("phone", { required: true })}
                  className={cn(errors.phone && "border-destructive")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  {...register("email", { required: true })}
                  className={cn(errors.email && "border-destructive")}
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <Label>{t("form.service")}</Label>
              <Select onValueChange={(val) => setValue("service", val)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("form.servicePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((opt, idx) => (
                    <SelectItem key={idx} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mb-6">
              <Label htmlFor="message">{t("form.message")}</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder={t("form.messagePlaceholder")}
                {...register("message")}
              />
            </div>

            <div className="space-y-3 mb-8">
              <Label>{t("form.language")}</Label>
              <RadioGroup
                value={selectedLanguage}
                onValueChange={(val) =>
                  setValue("language", val as "ar" | "en")
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="ar" id="lang-ar" />
                  <Label
                    htmlFor="lang-ar"
                    className="font-normal cursor-pointer"
                  >
                    {t("form.languageArabic")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="en" id="lang-en" />
                  <Label
                    htmlFor="lang-en"
                    className="font-normal cursor-pointer"
                  >
                    {t("form.languageEnglish")}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="w-4 h-4 me-2" />
                {t("form.submit")}
              </Button>

              <span className="text-muted-foreground text-sm">
                {t("form.whatsappAlt")}
              </span>

              <a
                href="https://wa.me/966556361166"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                {tCommon("whatsappLabel")}
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
