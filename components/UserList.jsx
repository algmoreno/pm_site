"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PageLoader } from '@/components/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserList = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/unauthorized")
    } else{
      router.push(`/admin`)
    }
  }, [session])

    // pull all users
    useEffect(() => {
      axios.get(`/api/auth/users/`)
        .then(res =>{setUsers(res.data.users)})
        .catch(err => console.error(err));
    }, []);

  if (status === "loading" || !users) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="w-[800px] h-auto mx-auto my-20 rounded-md border border-black p-5 ">
      <div className="text-[24px] border-b-2 border-gray-200">
        <h1 >All Users</h1>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
      {users.map((user) => (
        <li key={user.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {/* <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{user.role}</p>
          </div>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList