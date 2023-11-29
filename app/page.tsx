import { authOptions } from '@/auth'
import BlurBackground from '@/components/BlurBackground'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const sessions = await getServerSession(authOptions)
  console.log(sessions)

  return (
    <main className="">
      <div className="relative isolate pt-14 ">
        <BlurBackground />

        <div className="py-12 sm:py-20 lg:pb-40">
          <div className="mx-auto max-w-7x1 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Elevate Your Learning Experience!</h1>
              <p className="mt-6 text-lg tracking-tight font-sans leading-8 text-gray-600 dark:text-gray-300">
                Unlock the power of intelligent education with EduSynthPro – your all-in-one solution for seamless
                learning. Say goodbye to information overload and tedious study sessions.
                <span className="text-indigo-600">
                  EduSynthPro combines cutting-edge technology with educational expertise to revolutionize the way you
                  comprehend and interact with educational content.
                </span>
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/summarize"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover: bg-indigo-588 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible: outline-indigo-600"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
