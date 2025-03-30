//ignore @next/next/no-img-element
import { auth } from '~/server/auth'
import { HydrateClient } from '~/trpc/server'

import AnimatedSection from '../components/layout/animated-section'

export default async function Home() {
  const session = await auth()
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <AnimatedSection>
        <HydrateClient>
          <div>
            <h1>Hello</h1>
          </div>
        </HydrateClient>
      </AnimatedSection>
    </div>
  )
}
