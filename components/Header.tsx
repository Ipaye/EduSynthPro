import { getServerSession } from 'next-auth'
import DarkModeToggle from './DarkModeToggle'
import Logo from './Logo'
import UserButton from './UserButton'
import { authOptions } from '@/auth'
import Link from 'next/link'
import { BookmarkMinus } from 'lucide-react'

async function Header() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-white text-black">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        {/* logo */}
        <Logo />

        <div className="flex flex-1 items-center justify-end space-x-4 ">
          {/* language select */}

          {session ? (
            <>
              <Link
                className="flex"
                href="/summarize"
                prefetch={false}
              >
                <BookmarkMinus className="text-black dark:text-white" /> Summarize
              </Link>
            </>
          ) : (
            <Link
              href="/about"
              className="dark:text-white"
            >
              About
            </Link>
          )}

          {/* DarkMode Toggle */}
          <DarkModeToggle />
          {/* User button  */}
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  )
}

export default Header
