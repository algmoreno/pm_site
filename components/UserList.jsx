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
  const [loading, setLoading] = useState(true);
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
    .then(res =>{setUsers(res.data.users); setLoading(false)})
    .catch(err => console.error(err));
  }, []);
  

  const seeDetails = (userId) => {
    router.push(`/profile/${userId}`)
  }

  return (
    <div className="w-[80%] mx-auto mb-[9%] mt-10 p-5 bg-slate-200 rounded-md">
      {!loading ? (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base text-[28px] font-semibold text-gray-900">Users</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden ring-1 shadow-xs ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user) => (
                      <tr onClick={(e) => seeDetails(user._id)} key={user.email} className="hover:bg-slate-300">
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.email}</td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{user.role}</td>
                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                          <a href="#" className="text-gray-400 hover:text-gray-900">
                            Edit<span className="sr-only">, {user.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <PageLoader />
      )}
      
    </div>
  )
}

export default UserList