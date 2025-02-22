'use client'

import { FlickrContainer } from "../flickr-container";
import type { Picture } from "../flickr-container";

interface FlickrGridProps {
    pictures: Picture[];
}

export function FlickrGrid({ pictures }: FlickrGridProps) {
    return (
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pictures.map((picture) => (
                <FlickrContainer key={picture.id} picture={picture} />
            ))}
        </div>
    );
} 