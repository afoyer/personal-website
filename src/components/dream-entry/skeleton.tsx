'use client'
import { motion } from 'motion/react'

export default function DreamEntrySkeleton() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#070707] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Mood and date skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="h-4 w-4 rounded-full bg-gray-800"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="h-4 w-24 rounded bg-gray-800"
            />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1
              }}
              className="h-4 w-full rounded bg-gray-800"
            />
          ))}
        </div>

        {/* Tags skeleton */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1
              }}
              className="h-6 w-16 rounded-full bg-gray-800"
            />
          ))}
        </div>

        {/* AI Analysis skeleton */}
        <div className="mt-8 rounded-lg border border-gray-800 p-6">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 h-6 w-32 rounded bg-gray-800"
          />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1
                }}
                className="h-4 w-full rounded bg-gray-800"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
