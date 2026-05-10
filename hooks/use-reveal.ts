"use client"

import { useEffect, useRef } from "react"

/**
 * Adds `data-revealed="true"` to descendants matching `selector`
 * (default `[data-reveal]`) when the container scrolls into view.
 * Pair with the `.reveal` CSS rules in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: {
  selector?: string
  rootMargin?: string
  threshold?: number
  staggerMs?: number
}) {
  const ref = useRef<T | null>(null)
  const selector = options?.selector ?? "[data-reveal]"
  const rootMargin = options?.rootMargin ?? "0px 0px -10% 0px"
  const threshold = options?.threshold ?? 0.15
  const staggerMs = options?.staggerMs ?? 80

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (targets.length === 0) return

    // Respect reduced motion: reveal everything immediately.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      targets.forEach((el) => el.setAttribute("data-revealed", "true"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Sort by document order so stagger feels natural.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const cmp = a.target.compareDocumentPosition(b.target)
            return cmp & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
          })

        visible.forEach((entry, i) => {
          const el = entry.target as HTMLElement
          window.setTimeout(() => {
            el.setAttribute("data-revealed", "true")
          }, i * staggerMs)
          io.unobserve(el)
        })
      },
      { rootMargin, threshold },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector, rootMargin, threshold, staggerMs])

  return ref
}
