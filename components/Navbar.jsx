'use client';
import { useState, useEffect } from "react"
import Link from 'next/link';
import { navOptions } from '../constants';
import { UserDropdown, NavbarMenu } from '@/components/index';
import "@/styles/globals.css"

const Navbar = () => {

  return (
    <div className="min-h-[250px] w-full gap-4 font-primary flex bg-white text-black">
      <div className="text-[30px] m-auto flex">
        <h1 className="my-auto z-10 text-[38px] max-[860px]:hidden">
          <Link href='/'>PMYT</Link>
        </h1>

      </div>

      <div className="text-lg mr-auto gap-20 max-[870px]:hidden flex text-black z-10">
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