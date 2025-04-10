'use client'

import { useState, useEffect } from 'react'
import { signOut, getCurrentUser, signInWithRedirect } from 'aws-amplify/auth'
import { Button } from '../ui/button'

export function AuthButtons() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      console.log('Checking user...')
      const currentUser = await getCurrentUser()
      console.log('Current user:', currentUser)
      setUser(currentUser)
      setError(null)
    } catch (error) {
      // Silently handle unauthenticated state
      if (
        error instanceof Error &&
        (error.message.includes('No current user') ||
          error.message.includes('User needs to be authenticated'))
      ) {
        console.log('No authenticated user - this is expected')
        setUser(null)
      } else {
        console.error('Error checking user:', error)
        setError('Failed to check authentication status')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleSignIn() {
    try {
      console.log('Initiating sign in...')
      setError(null)
      await signInWithRedirect({ provider: 'Google' })
    } catch (error) {
      console.error('Error signing in:', error)
      setError('Failed to sign in with Google')
    }
  }

  async function handleSignOut() {
    try {
      setError(null)
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
      setError('Failed to sign out')
    }
  }

  if (loading) {
    return <Button disabled>Loading...</Button>
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-red-500">{error}</p>
        <Button onClick={checkUser} variant="outline">
          Retry
        </Button>
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Signed in as {user.username}
          </span>
          <Button onClick={handleSignOut} variant="outline">
            Sign out
          </Button>
        </div>
        <div className="text-xs text-gray-500">User ID: {user.userId}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600">Not signed in</p>
      <Button onClick={handleSignIn} variant="outline">
        Sign in with Google
      </Button>
    </div>
  )
}
