"use client"; 
import { useEffect, useState } from "react";
import { Loader } from '@/components/index'
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const UserDetails = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [session])

  useEffect(() => {
    if (id) {
      axios.get(`/api/auth/users/${id}`)
        .then(res =>{setUser(res.data.user)})
        .catch(err => console.error(err));
    }
    
  }, [id]);

  if (!user) {
    return (
      <Loader />
    )
  }
  const handleSubmit = async(e) => {     
    e.preventDefault();
    setPending(true);
    const validated = validation();

    if (!validated) return;
    
    // edit user info
    try {
      const response = await axios.put('/api/auth/users', user)
      setPending(false);
      toast.success(response.data.message);
      router.push("/login")
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setPending(false);
    }
  }

  const validation = () => {
    if (!validEmail.test(user.email)) {
      setError("Invalid email format.")
      return false
    }
    if (!validPassword.test(user.password)) {
      setError("Password must include: number, special character, and both lower case and upper case letters.")
      return false
    }
    if (user.confirmPassword !== user.password) {
      setError("Password does not match.")
      return false
    }
    return true
  }

  return (
    <div className="w-[1200px] h-auto mx-auto my-20 flex flex-wrap drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
      <form className="w-[70%] my-5 mx-auto bg-slate-400 rounded-md border-2 border-gray-200 p-10 " onSubmit={handleSubmit}>
        <div className="space-y-2 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-[24px] font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-200">{user.firstName}'s Account Info</p>
            {!!error && (
              <div className="bg-red-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-200 my-6">
                <p>
                  {error}
                </p>
              </div>
            )}
            <div className="mt-10">

              <div className="col-span-4">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  First Name
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({...user, firstName:e.target.value})}
                    required
                    className="block w-[50%] m-[auto] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Last Name
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({...user, lastName:e.target.value})}
                    required
                    className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Email
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    required
                    className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label> 
                <div className="mt-2">
                  <input
                    disabled={pending}
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    required
                    className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                    outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 ">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-300 focus-visible:outline-2 f
                        ocus-visible:outline-offset-2 focus-visible:outline-slate-600">
            Submit
          </button>
        </div>

      </form>
      
      <div className=" border-4 border-gray-200 bg-slate-400 p-5 rounded-md flex-wrap ">
        <div className="text-[24px] border-b-2 border-gray-200">
          <h1 className="mb-5 text-gray-900">Upcoming Appointments</h1>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
        {user.appointments.map((appointment) => (
          <li key={appointment.date} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="mt-1 truncate text-xs/5 text-gray-100">{appointment.date}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{appointment.duration} min.</p>
            </div>
          </li>
          ))}
        </ul>
      </div>

    </div>
  )
}


export default UserDetails