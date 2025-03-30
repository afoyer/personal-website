'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DarkModeToggle } from "../layout/DarkModeToggle";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                            AF
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link
                            href="/photos"
                            className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/photos'
                                ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
                                }`}
                        >
                            Photos
                        </Link>
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}; 