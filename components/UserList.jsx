"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserList = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin";

  if (!isAdmin) {
    router.push("/unauthorized")
  }
  // pull all users

  return (
    <div className="w-[800px] h-auto mx-auto my-20 bg-slate-400 rounded-md">
      <ul role="list" class="divide-y divide-gray-100">
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <img class="size-12 flex-none rounded-full bg-gray-50" 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div class="min-w-0 flex-auto">
              <p class="text-sm/6 font-semibold text-gray-900">Leslie Alexander</p>
              <p class="mt-1 truncate text-xs/5 text-gray-500">leslie.alexander@example.com</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm/6 text-gray-900">Co-Founder / CEO</p>
            <p class="mt-1 text-xs/5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
          </div>
        </li>
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <img class="size-12 flex-none rounded-full bg-gray-50" 
              src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div class="min-w-0 flex-auto">
              <p class="text-sm/6 font-semibold text-gray-900">Michael Foster</p>
              <p class="mt-1 truncate text-xs/5 text-gray-500">michael.foster@example.com</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm/6 text-gray-900">Co-Founder / CTO</p>
            <p class="mt-1 text-xs/5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default UserList