'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Authenticator />
    </div>
  )
}
