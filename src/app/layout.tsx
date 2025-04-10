import '~/styles/globals.css'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'
import { ThemeScript } from '~/components/layout/ThemeScript'
import { Navbar } from '~/components/navbar'
import { TRPCReactProvider } from '~/trpc/react'
import { AmplifyProvider } from '~/components/auth/amplify-provider'

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
      <AmplifyProvider>
        <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
          <head>
            <ThemeScript />
          </head>

          <body className="flex min-h-screen flex-col bg-gray-50 transition-colors dark:bg-gray-900">
            <main className="flex-1">
              <Navbar />
              <div className="pt-16">{children}</div>
            </main>
          </body>
        </html>
      </AmplifyProvider>
    </TRPCReactProvider>
  )
}
