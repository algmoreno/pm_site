'use client';
import * as THREE from "three"
import { useState } from "react"
import Link from 'next/link';
import { navOptions } from '../constants';
import { UserDropdown, NavbarMenu } from '@/components/index';
import { Html } from '@react-three/drei';
import { Canvas, useFrame } from "@react-three/fiber"
import { Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl } from "@react-three/drei"
import "@/styles/globals.css"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-[100px] w-full gap-4 font-primary flex bg-transparent text-black">
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