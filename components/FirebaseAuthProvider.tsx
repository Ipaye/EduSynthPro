'use client'
import { auth } from '@/firebase'
import { signInWithCustomToken } from 'firebase/auth'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  async function syncFirebaseAuth(session: Session) {
    if (session && session.firebaseToken) {
      try {
        await signInWithCustomToken(auth, session.firebaseToken)
      } catch (error) {
        console.error('🔴 Error signing in with custom token: ', error)
      }
    } else {
      auth.signOut()
    }
  }

  useEffect(() => {
    if (!session) return
    syncFirebaseAuth(session)
  }, [session])
  return <>{children}</>
}

export default FirebaseAuthProvider
