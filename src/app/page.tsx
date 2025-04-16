//ignore @next/next/no-img-element
import { getCurrentUser } from 'aws-amplify/auth'
import { HydrateClient } from '~/trpc/server'

import AnimatedSection from '../components/layout/animated-section'

export default async function Home() {
  let user = null
  try {
    user = await getCurrentUser()
    console.log('Amplify user:', user)
  } catch (error) {
    // This is expected when no user is signed in
    console.log('No authenticated user - this is normal on first load')
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AnimatedSection>
        <HydrateClient>
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl font-bold">Welcome</h1>
          </div>
        </HydrateClient>
      </AnimatedSection>
    </div>
  )
}
