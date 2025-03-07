"use client";
import React from 'react'
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { CgProfile } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } 
        from '@/components/ui/dropdown-menu';

const UserDropdown = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin";

  if (status === "loading"){
    return (
      <div className="my-auto">Loading...</div>
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

  const goToAdmin = () => {
    router.push(`/admin`);
  };

  const goToProfile = () => {
    router.push(`/profile/${session.user.id}`);
  };

  return (
    <div className="m-auto">
      {!session ? (
        <Link href="/login">
          <CgProfile size={25} className="m-auto"/>
          Login
        </Link>
      ) : (
      isAdmin ? (
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
            <DropdownMenuItem onClick={goToAdmin} className="h-10">
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={goToProfile} className="h-10">
              Your Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSignOut()} className="h-10">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        ) : (
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
            <DropdownMenuItem onClick={goToProfile} className="h-10">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSignOut()} className="h-10">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )
      ) 
    }

    </div>
  )
}

export default UserDropdown;