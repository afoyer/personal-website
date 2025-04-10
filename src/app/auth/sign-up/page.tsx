'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth/sign-in?formType=signUp')
  }, [router])

  return null
}
