"use client"; 
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { PageLoader } from '@/components/index';
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { format } from 'date-fns';

const UserDetails = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAdmin = session?.user.role === "admin"
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else{
      router.push(`/appointment/${id}`)
    }
  }, [session])

  useEffect(() => {
    if (id) {
      axios.get(`/api/auth/appointments/${id}`)
        .then(res =>{setAppointment(res.data.appointment)})
        .catch(err => console.error(err));
    }
  }, [id]);

  if (status === "loading" || !appointment) {
    return (
      <PageLoader />
    )
  }

  const handleSubmit = async(e) => {     
    e.preventDefault();
    setPending(true);
    
    // edit appointment info
    try {
      // send appointment change request

      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setPending(false);
    }
    // cancel appointment

  }

  const cancelEdit = () => {
    setPending(true);
    setShowConfirm(false)
  }

  return (
    <div className="w-[80%] h-auto mx-auto mt-[9%] max-sm:mt-[35%] mb-20 flex flex-wrap rounded-md bg-slate-200 border border-gray-300 p-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
      <div className="px-4 sm:px-0 ml-2">
        <h3 className="text-base/7 font-semibold text-gray-900">Appointment Details</h3>
      </div>
      
      <div className="mt-6 border-t border-gray-100 w-[1300px]">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">For</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{appointment.user.firstName} {appointment.user.lastName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Date</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(appointment.startDatetime, "M-dd-yyyy h:mm a")} to {format(appointment.endDatetime, "M-dd-yyyy h:mm a")}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{appointment.user.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Duration</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">60 min.</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Price</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${appointment.price}</dd>
          </div>
          
        </dl>
      </div>
    </div>
  )
}


export default UserDetails