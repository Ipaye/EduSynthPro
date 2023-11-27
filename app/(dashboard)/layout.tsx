import BlurBackground from '@/components/BlurBackground'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <div className="relative isolate">
        <BlurBackground />

        <div className="py-12 sm:py-20 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default layout
