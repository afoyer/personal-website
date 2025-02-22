'use client'

import { signIn } from "next-auth/react"

export default function SpotifySignIn() {
    return (
        <button
            onClick={() => signIn('spotify')}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
            Sign in with Spotify
        </button>
    )
}