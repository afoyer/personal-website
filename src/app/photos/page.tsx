import Link from "next/link";
import { FlickrGrid } from "~/components/flickr-grid";
import SpotifySignIn from "~/components/spotify-sign-in";
//ignore @next/next/no-img-element
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function PhotosPage() {
  const pictures = await api.post.getPics()
  const session = await auth();
  return (
    <HydrateClient>
      <div className="pt-16 w-full min-h-[calc(100vh-4rem)] bg-red-500 dark:bg-red-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-12 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]  dark:text-gray-900">
              Hello! Photos page
            </h1>
            <FlickrGrid pictures={pictures} />
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl text-gray-900 dark:text-white">
                  {session && <span>Logged in as {session.user?.name}</span>}
                </p>
                {!session && <SpotifySignIn />}
                {session && <Link
                  href={"/api/auth/signout"}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  Sign out
                </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
