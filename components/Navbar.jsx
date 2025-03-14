'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import "@/styles/globals.css"
import { SunWidget } from '@/components/index'
import { navOptions } from '../constants';
import { UserDropdown, NavbarMenu } from '@/components/index';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-[100px] gap-4 font-primary flex flex-wrap">
      <div className="text-[30px] m-auto flex">
        <h1 className="my-auto z-10 text-[38px]">
          <Link href='/'>PM Yoga Therapy</Link>
        </h1>

      </div>

      <div className="text-lg mr-auto gap-20 max-md:hidden flex">
        {navOptions.map((option) => (
        <div key={option.name} className="m-auto">
          {option.name === "Log In" 
          && <p>{option.icon}</p>}
          <Link href={option.href}>{option.name}</Link>
        </div>
        ))}
        <UserDropdown />
      </div>

      <div className="md:hidden align-middle flex m-auto">          
        <NavbarMenu />
      </div>
    </div>
  )
}

export default Navbar;