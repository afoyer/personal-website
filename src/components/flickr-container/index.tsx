import * as motion from "motion/react-client";
import Link from "next/link";
import { ExternalLinkIcon } from "~/components/icons/external-link-icon";

interface Picture {
  id: string;
  url: string;
  title: string;
  flickrUrl?: string;
}

interface FlickrContainerProps {
  picture: Picture;
}

export function FlickrContainer({ picture }: FlickrContainerProps) {
  return (
    <div className="relative w-full max-w-md group">
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <img
          src={picture.url}
          alt={picture.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-black/50 flex items-end p-4"
        >
          {picture.flickrUrl && (
          <Link 
            href={picture.flickrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ExternalLinkIcon />
          </Link>
        )}
          <h3 className="text-xl font-bold text-white">{picture.title}</h3>
        </motion.div>
      </div>
    </div>
  );
} 