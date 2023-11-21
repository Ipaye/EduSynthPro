'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import { Session } from 'next-auth'
import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'

function UserButton({ session }: { session: Session | null }) {
  if (!session)
    return (
      <Button
        variant={'outline'}
        onClick={() => signIn()}
      >
        Signin
      </Button>
    )

  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            name={session?.user?.name}
            image={session?.user?.image}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Signout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  )
}

export default UserButton
