import Link from "next/link";
import Image from "next/image";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import * as motion from "motion/react-client"
import React from "react";
export default async function Home() {
  const pictures = await api.post.getPics()
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <motion.div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Hello!
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
            {pictures.map((picture) => (
              <div 
                key={picture.id} 
                className="relative w-full max-w-md group"
              >
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
                    <h3 className="text-xl font-bold text-white">{picture.title}</h3>
                  </motion.div>
                </div>
              </div>
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
