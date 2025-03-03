"use client";
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserLink = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div>
      <CgProfile size={25} className="m-auto"/>
      {session?.user.firstName}
    </div>
  )
}

export default UserLink