'use client'

import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function AnimatedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={pathname}
        className="flex min-h-screen flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  )
}
