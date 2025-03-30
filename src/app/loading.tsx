'use client'
import { motion } from 'motion/react'
import React from 'react'

export default function Spinner() {
  return (
    <motion.div
      className="h-screen w-full bg-gray-200 pt-16 text-center text-black dark:bg-gray-900 dark:text-white"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ ease: 'easeOut' }}
    >
      Loading 2
    </motion.div>
  )
}
