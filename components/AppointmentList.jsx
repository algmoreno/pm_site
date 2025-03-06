"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AppointmentList = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin";

  if (!isAdmin) {
    router.push("/unauthorized")
  }

  return (
    <div className="w-[800px] h-auto mx-auto my-20 bg-slate-400 rounded-md">
      AppointmentList
    </div>
  )
}

export default AppointmentList