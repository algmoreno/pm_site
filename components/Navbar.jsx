import React from 'react';
import Link from 'next/link';
import { CiMenuBurger } from "react-icons/ci";


const Navbar = () => {
  return (
    <div className="h-[100px] border-b border-black grid grid-cols-3 max-md:grid-cols-2 gap-4 font-primary">
      <div className="text-[30px] m-auto">
        <h1>
          <Link href='/'>Paula Moreno</Link>
        </h1>
      </div>

      <div className="text-lg m-auto gap-20 max-md:hidden flex">
        <h1>
        <Link href='/#about'>About</Link>
        </h1>
        <h1>
          <Link href='/schedule'>Schedule</Link>
        </h1>
        <h1>
          <Link href='/shop'>Shop</Link>
        </h1>
        <h1>
          <Link href='/contact'>Contact</Link>
        </h1>
      </div>

      <div className="md:hidden align-middle flex">
        <CiMenuBurger className="h-auto w-[35px] m-auto"/>
      </div>

    </div>
  )
}

export default Navbar;