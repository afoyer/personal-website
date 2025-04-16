import Link from 'next/link'
import { FlickrGrid } from '~/components/flickr-grid'
import SpotifySignIn from '~/components/spotify-sign-in'
//ignore @next/next/no-img-element
import { auth } from '~/server/auth'
import { api, HydrateClient } from '~/trpc/server'

export default async function PhotosPage() {
  const pictures = await api.post.getPics()
  const session = await auth()
  return (
    <HydrateClient>
      <div className="min-h-[calc(100vh-4rem)] w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-12">
            <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white sm:text-[5rem]">
              Hello! Photos page
            </h1>
            <FlickrGrid pictures={pictures} />
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl text-black dark:text-white">
                  {session && <span>Logged in as {session.user?.name}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  )
}
