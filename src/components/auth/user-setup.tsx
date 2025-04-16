'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import { generateClient } from 'aws-amplify/api'
import type { Schema } from '../../../amplify/data/resource'

export function UserSetup() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [client, setClient] = useState<ReturnType<
    typeof generateClient<Schema>
  > | null>(null)

  useEffect(() => {
    const setupUser = async () => {
      if (!client) {
        console.log('Client not initialized')
        return
      }

      try {
        // First check if we have a valid auth session
        const session = await fetchAuthSession()
        if (!session) {
          console.log('No auth session found')
          return
        }

        // Get the current authenticated user
        const { userId, username, signInDetails } = await getCurrentUser()
        console.log('Current user:', { userId, username, signInDetails })

        try {
          // Check if user already exists in our database
          console.log('Checking for existing user...')
          const existingUser = await client.models.User.get({ id: userId })
          console.log('Existing user:', existingUser)

          if (!existingUser) {
            console.log('Creating new user...')
            // Create new user in our database
            await client.models.User.create({
              id: userId,
              email: signInDetails?.loginId || username,
              name: username,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            })

            console.log('New user created in database')
          }
        } catch (error) {
          console.error('Error accessing database:', error)
          if (error instanceof Error) {
            console.error('Error details:', {
              message: error.message,
              stack: error.stack,
              name: error.name
            })
          }
        }
      } catch (error) {
        // Only log errors that aren't related to unauthenticated state
        if (
          !(
            error instanceof Error &&
            (error.message.includes('No current user') ||
              error.message.includes('User needs to be authenticated'))
          )
        ) {
          console.error('Error setting up user:', error)
        }
      }
    }

    // Only try to setup user if we have a valid auth session and client
    if (isConfigured && client) {
      setupUser()
    }
  }, [isConfigured, client])

  // Check if Amplify is configured and setup the client
  useEffect(() => {
    const checkConfig = async () => {
      try {
        const session = await fetchAuthSession()
        if (session) {
          console.log('Auth session found, generating client...')
          // Only generate client after auth is configured and we have a valid session
          const newClient = generateClient<Schema>()
          console.log('Client generated:', newClient)
          setClient(newClient)
          setIsConfigured(true)
        }
      } catch (error) {
        console.log('Amplify not yet configured or no valid session:', error)
      }
    }
    checkConfig()
  }, [])

  return null
}
