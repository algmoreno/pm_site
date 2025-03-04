"use client";
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { toast } from "sonner";
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserLink = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // pass session to dropdown menu -> if logged provide logout, profile page option. if not display only login option

  if (status === "loading"){
    return (
      <div className="m-auto">Loading...</div>
    )
  }
  const avatarFallback = session?.user?.firstName?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
      await signOut({
        redirect: false,
      });    
      router.push("/");
      toast.success("Successfully logged out.");
  }

  return (
    <div className="m-auto">
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative">
            <div className="flex gap-4 items-center">
              <span>{session.user?.firstName}</span>
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarFallback className="bg-orange-400 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem onClick={() => handleSignOut()} className="h-10">
              Log Out
            </DropdownMenuItem>
            <DropdownMenuItem className="h-10">
              <Link href="/login">Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <CgProfile size={25} className="m-auto"/>
          Login
        </Link>
      )
    }

    </div>
  )
}

export default UserLink;