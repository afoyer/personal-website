import Link from "next/link";
//ignore @next/next/no-img-element

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import * as motion from "motion/react-client"
import { FlickrContainer } from "~/components/flickr-container";

export default async function Home() {
  const pictures = await api.post.getPics()
  const session = await auth();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a9313d] to-[#0a0505] text-white">
          <motion.div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Hello!
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
            {pictures.map((picture) => (
              <FlickrContainer key={picture.id} picture={picture} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </HydrateClient>
  );
}
