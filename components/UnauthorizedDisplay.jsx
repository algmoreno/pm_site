"use client";
import React from 'react'
import { PiImageBrokenThin } from "react-icons/pi";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UnauthorizedDisplay = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      router.push("/unauthorized")
    } else {
      router.push("/admin")
    }
  }, [isAdmin])

  return (
    <div className="w-[800px] h-[500px] mx-auto my-[7%] rounded-md flex">
      <div className="m-auto">
        <PiImageBrokenThin size={200} color="red" className="m-auto justify-center"/>
        <h1 className="mx-auto text-center text-[22px]" >
          Unauthorized
        </h1>
      </div>
    </div>
  )
}

export default UnauthorizedDisplay