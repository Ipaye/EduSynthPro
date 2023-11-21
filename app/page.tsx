import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const sessions = await getServerSession(authOptions)
  console.log(sessions)

  return (
    <main className="">
      <div className="relative isolate pt-14 dark:bg-gray-900">
        <div
          className="absolute inset-x-0 top-28 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] [#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon (74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          ></div>
        </div>

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
