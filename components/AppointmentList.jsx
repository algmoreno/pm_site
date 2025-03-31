"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PageLoader } from '@/components/index';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';

const AppointmentList = ({ userId }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin";
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/unauthorized")
    }
  }, [isAdmin])

  // get user
  useEffect(() => {
    if (userId) {
      axios.get(`/api/auth/users/${userId}`)
        .then(res =>{setUser(res.data.user)})
        .catch(err => console.error(err));
    }
  }, [userId]);

  if (status === "loading" || !user) {
    return (
      <PageLoader />
    )
  }

  const seeDetails = (apptId) => {
    router.push(`/appointment/${apptId}`)
  }

  return (
    <div className="w-[700px] h-[600px] min-h-[500px] mx-auto mt-[150px] mb-[5%] border-2 border-gray-500 bg-slate-50 p-5 rounded-md flex-wrap overflow-auto">
      <div className="text-[24px] border-b-2 border-gray-900">
        <h1 className="mb-5 text-gray-900">Upcoming Appointments</h1>
      </div>
      <ul role="list" className="divide-y divide-gray-800">
        {user.appointments.map((appointment) => (
          <li onClick={(e) => seeDetails(appointment._id)} key={appointment._id} className="flex justify-between gap-x-6 py-5 hover:cursor-pointer hover:bg-gray-200 p-4">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
              <p className="text-sm/6 text-black">{format(appointment.startDatetime, "MMMM dd, yyyy")}</p>
                <p className="text-sm/6 text-black">{format(appointment.startDatetime, "h:mm a")} - {format(appointment.endDatetime, "h:mm a")}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AppointmentList