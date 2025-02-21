'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CiMenuBurger } from "react-icons/ci";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const Menu = ({ navOptions }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 border-none ml-auto focus:outline-none">
          <CiMenuBurger className={`${!showMenu ? 'text-black' : 'text-slate-400'} h-auto w-[35px] m-auto `} onClick={() => setShowMenu(!showMenu)}/>
      </PopoverButton>

      <PopoverPanel
        transition
        className="fixed left-1/2 z-10 mt-[30px] flex w-auto -translate-x-1/2 transition data-closed:translate-y-1 data-closed:opacity-0 
                    data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-b-2xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
          <div className="p-4 ">
            {navOptions.map((item) => (
              <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  
                </div>
                <div>
                  <a href={item.href} className="font-semibold text-gray-900">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  const navOptions = [
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Schedule",
      href: "schedule",
    },
    {
      name: "Shop",
      href: "shop",
    },
    {
      name: "Contact",
      href: "contact"
    }
  ]

  return (

    <div className="h-[100px] grid grid-cols-3 max-md:grid-cols-2 gap-4 font-primary">
      <div className="text-[30px] m-auto">
        <h1>
          <Link href='/'>PM Yoga</Link>
        </h1>
      </div>

      <div className="text-lg m-auto gap-20 max-md:hidden flex">
        {navOptions.map((option) => (
          <Link key={option.name} href={option.href}>{option.name}</Link>
        ))}
      </div>

      <div className="md:hidden align-middle flex m-auto">
          <Menu navOptions={navOptions}/>
      </div>
    </div>
  )
}

export default Navbar;