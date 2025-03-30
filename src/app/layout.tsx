import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'
import { ThemeScript } from '~/components/layout/ThemeScript'
import { Navbar } from '~/components/navbar'
import { TRPCReactProvider } from '~/trpc/react'

export const metadata: Metadata = {
  title: 'Aymeric F',
  description: 'Welcome to my portfolio',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>
      <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
        <head>
          <ThemeScript />
        </head>

        <body className="flex min-h-screen flex-col bg-gray-50 transition-colors dark:bg-gray-900">
          <main>
            <Navbar />
            {children}
          </main>
        </body>
      </html>
    </TRPCReactProvider>
  )
}
