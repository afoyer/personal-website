import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { fetchAuthSession } from 'aws-amplify/auth'

export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/dream/:path*']
} 