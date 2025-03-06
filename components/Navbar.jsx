'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { navOptions } from '../constants';
import { UserLink, NavbarMenu } from '@/components/index';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-[100px]  gap-4 font-primary flex flex-wrap">
      <div className="text-[30px] m-auto">
        <h1>
          <Link href='/'>PM Yoga</Link>
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
        <UserLink />
      </div>

      <div className="md:hidden align-middle flex m-auto">          
        <NavbarMenu />
      </div>
    </div>
  )
}

export default Navbar;