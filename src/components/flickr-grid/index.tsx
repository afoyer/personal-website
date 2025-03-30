'use client'

import { FlickrContainer } from '../flickr-container'
import type { Picture } from '../flickr-container'

interface FlickrGridProps {
  pictures: Picture[]
}

export function FlickrGrid({ pictures }: FlickrGridProps) {
  return (
    <div className="grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pictures.map((picture) => (
        <FlickrContainer key={picture.id} picture={picture} />
      ))}
    </div>
  )
}
