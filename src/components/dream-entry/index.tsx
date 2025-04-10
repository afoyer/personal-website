'use client'
import type { Schema } from '../../../amplify/data/resource'
import { motion } from 'motion/react'
import { getCurrentUser } from 'aws-amplify/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type DreamType = NonNullable<Schema['Dream']['type']>

interface DreamEntryProps {
  dream: DreamType
}

function DreamContent({ dream }: { dream: DreamType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full bg-[#070707] px-4 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl pt-24">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: dream.mood }}
            />
            <span className="text-sm text-gray-400">
              {new Date(dream.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-lg leading-relaxed">
            {dream.content}
          </p>
        </div>

        {dream.tags && dream.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {dream.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {dream.aiAnalysis && (
          <div className="mt-8 rounded-lg border border-gray-800 p-6">
            <h3 className="mb-4 text-lg font-semibold">AI Analysis</h3>
            <p className="text-gray-400">{dream.aiAnalysis}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function DreamEntry({ dream }: DreamEntryProps) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAuthorization() {
      try {
        const currentUser = await getCurrentUser()
        setIsAuthorized(currentUser.userId === dream.userId)
        setIsAuthorized(true)
      } catch (error) {
        console.error('Error checking authorization:', error)
        setIsAuthorized(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthorization()
  }, [dream.userId])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">
          You are not authorized to view this dream.
        </div>
      </div>
    )
  }

  return <DreamContent dream={dream} />
}
