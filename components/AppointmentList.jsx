"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PageLoader } from '@/components/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AppointmentList = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin";
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/unauthorized")
    }
  }, [isAdmin])

  // pull all appointments
  useEffect(() => {
    axios.get(`/api/auth/appointments/`)
      .then(res =>{setAppointments(res.data.appointments)})
      .catch(err => console.error(err));
  }, []);

  if (status === "loading" || !appointments) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="w-[800px] h-auto mx-auto my-20 rounded-md border border-black p-5">
      <div className="text-[24px] border-b-2 border-gray-200">
        <h1>Your Appointments</h1>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
      {appointments.map((appointment) => (
        <li key={appointment.date} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{appointment.user.firstName} {appointment.user.lastName}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">Duration: {appointment.duration}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">${appointment.price}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{appointment.date}</p>
          </div>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default AppointmentList