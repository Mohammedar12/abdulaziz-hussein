import { setRequestLocale } from "next-intl/server"

import { Hero } from "@/components/sections/hero"
import { Stats } from "@/components/sections/stats"
import { Certifications } from "@/components/sections/certifications"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { Clients } from "@/components/sections/clients"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <Stats />
      <Certifications />
      <About />
      <Services />
      <Clients />
    </>
  )
}
