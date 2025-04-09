"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CiMenuBurger } from "react-icons/ci";
import { RiLogoutBoxLine, RiAdminFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { navOptions } from '../constants';
import { toast } from "sonner";
import { signOut } from 'next-auth/react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavbarMenu = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const avatarFallback = session?.user?.firstName?.charAt(0).toUpperCase();
  const isAdmin = session?.user.role === "admin";

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
    });    
    router.push("/");
    toast.success("Successfully logged out.");
  }

  const goToProfile = () => {
    router.push(`/profile/${session.user.id}`);
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
      <>
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 border-none ml-auto focus:outline-hidden">
          <CiMenuBurger className={`${!showMenu ? 'text-black' : 'text-slate-400'} h-auto w-[35px] m-auto`} onClick={() => setShowMenu((prevShowMenu) => !prevShowMenu)}/>
      </PopoverButton>
      
      <PopoverPanel
        transition
        className="fixed overflow-scroll left-1/2 z-100 mt-[30px] flex w-auto -translate-x-1/2 transition data-closed:translate-y-1 data-closed:opacity-0 
                  data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-b-2xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
          {!session ? (
            <div className="p-4 ">
              {navOptions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    {item.icon}
                  </div>
                  <div className="align-middle my-auto">
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                  </div>
                </div>
              ))}          
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <CgProfile size={25} className="m-auto"/>
                </div>
                <div className="align-middle my-auto">
                  <a href="/login" className="font-semibold text-gray-900">
                    Log In
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
          isAdmin ? (
            <div className="p-4 ">
              {navOptions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    {item.icon}
                  </div>
                  <div className="align-middle my-auto">
                    <a onClick={() => close()} href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                  </div>
                </div>
              ))}          
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-orange-400 group-hover:bg-white">
                  {avatarFallback}
                </div>
                <div className="align-middle my-auto">
                  <a href={`/profile/${session.user.id}`} className="font-semibold text-gray-900">
                    Your Account
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-blue-600 group-hover:bg-white">
                  <RiAdminFill size={25} className="m-auto"/>
                </div>
                <div className="align-middle my-auto">
                  <a href="/admin" className="font-semibold text-gray-900">
                    Admin
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <RiLogoutBoxLine size={25} className="m-auto"/>
                </div>
                <div className="align-middle my-auto">
                  <span onClick={() => { handleSignOut(); close(); }} className="font-semibold text-gray-900">
                    Log Out
                    <span className="absolute inset-0" />
                  </span>
                </div>
              </div>
            </div>
            ) : (
            <div className="p-4 ">
              {navOptions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    {item.icon}
                  </div>
                  <div className="align-middle my-auto">
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                  </div>
                </div>
              ))}          
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-orange-400 group-hover:bg-white">
                  {avatarFallback}
                </div>
                <div className="align-middle my-auto">
                  <a href="/profile" className="font-semibold text-gray-900">
                    Profile
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <RiLogoutBoxLine size={25} className="m-auto"/>
                </div>
                <div className="align-middle my-auto">
                  <span onClick={() => { handleSignOut(); close(); }} className="font-semibold text-gray-900">
                    Log Out
                    <span className="absolute inset-0" />
                  </span>
                </div>
              </div>
            </div>
            )
          )}
        </div>
      </PopoverPanel>
      </>
       )}
    </Popover>
  )
}

export default NavbarMenu;