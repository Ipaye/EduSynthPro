import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import ClientProvider from '@/components/ClientProvider'
import FirebaseAuthProvider from '@/components/FirebaseAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduSynthPro',
  description: 'Revolutionize your education with smart summaries and AI-driven questions!'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <FirebaseAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </ThemeProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProvider>
  )
}
