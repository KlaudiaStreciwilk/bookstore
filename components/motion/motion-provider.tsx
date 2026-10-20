'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

// Safety net: honours the OS "reduce motion" setting for every motion component on the page.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
