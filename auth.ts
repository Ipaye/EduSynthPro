import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { adminAuth, adminDB } from './firebase-admin'
import { FirestoreAdapter } from '@auth/firebase-adapter'
import { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLEINT_SECRET!!
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub

          const firebaseToken = await adminAuth.createCustomToken(token.sub)
          session.firebaseToken = firebaseToken
        }
      }

      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
  session: {
    strategy: 'jwt'
  },
  adapter: FirestoreAdapter(adminDB) as Adapter
} satisfies NextAuthOptions
