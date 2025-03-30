'use client'

import { motion } from 'motion/react'

import type { ReactNode } from 'react'

export default function AnimatedSection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.section>
  )
}
