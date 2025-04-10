'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { DarkModeToggle } from '../layout/DarkModeToggle'

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="sticky left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm transition-colors dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              AF
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/photos"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === '/photos'
                  ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white'
              }`}
            >
              Photos
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
