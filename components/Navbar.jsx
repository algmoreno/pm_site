import React from 'react';
import Link from 'next/link';


const Navbar = () => {
  return (
    <div className="h-[100px] border-b-2 border-black">
      <h1 className="text-xl ">
        <Link className="" href="/">Paula Moreno</Link>
      </h1>
    </div>
  )
}

export default Navbar;