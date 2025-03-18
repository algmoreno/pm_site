'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import "@/styles/globals.css"
import { navOptions } from '../constants';
import { UserDropdown, NavbarMenu } from '@/components/index';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-[100px] w-full gap-4 font-primary flex fixed z-50 bg-white">
      <div className="text-[30px] m-auto flex">
        <h1 className="my-auto z-10 text-[38px] max-[860px]:hidden">
          <Link href='/'>PM Yoga Therapy</Link>
        </h1>
        <div className="my-auto">
          <img className="m-auto w-[120px]" src="/assets/logo_1.png" alt="" />
        </div>

      </div>

      <div className="text-lg mr-auto gap-20 max-[870px]:hidden flex">
        {navOptions.map((option) => (
        <div key={option.name} className="m-auto">
          {option.name === "Log In" 
          && <p>{option.icon}</p>}
          <Link href={option.href}>{option.name}</Link>
        </div>
        ))}
        <UserDropdown />
      </div>

      <div className="min-[870px]:hidden align-middle flex m-auto">          
        <NavbarMenu />
      </div>
    </div>
  )
}

export default Navbar;