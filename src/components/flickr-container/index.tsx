'use client'

import * as motion from 'motion/react-client'
import Link from 'next/link'
import { ExternalLinkIcon } from '~/components/icons/external-link-icon'

export interface Picture {
  id: string
  url: string
  title: string
  flickrUrl?: string
}

interface FlickrContainerProps {
  picture: Picture
}

export function FlickrContainer({ picture }: FlickrContainerProps) {
  return (
    <div className="group relative w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <img
          src={picture.url}
          alt={picture.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-end bg-black/50 p-4"
        >
          {picture.flickrUrl && (
            <Link
              href={picture.flickrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70"
            >
              <ExternalLinkIcon />
            </Link>
          )}
          <h3 className="text-xl font-bold text-white">{picture.title}</h3>
        </motion.div>
      </div>
    </div>
  )
}
