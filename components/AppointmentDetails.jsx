"use client"; 
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { PageLoader } from '@/components/index';
import axios from "axios";

const UserDetails = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
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

  console.log(appointment);
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

  const editForm = () => {
    setPending(false);
    setShowConfirm(true)
  }

  const cancelEdit = () => {
    setPending(true);
    setShowConfirm(false)
  }

  return (
    <div className="w-[1400px] h-auto mx-auto my-20 flex flex-wrap drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
      Appt Details
    </div>
  )
}


export default UserDetails