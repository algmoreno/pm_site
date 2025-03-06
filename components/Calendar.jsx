"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { format } from 'date-fns';

const Calendar = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState(null);
  const id = session?.user.id
  const [appointment, setAppointment] = useState({
    date: '',
    duration: '',
    price: 50,
    userId: id
  });
  
  if (!session) {
    router.push("/login")
  }

  function handleChange(e) {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    // add appt
    try {
      console.log("appointment", appointment);
      const response = await axios.post('/api/auth/appointments', appointment);
      console.log("appt response", response);
      setStatus("Appointment successfully booked!")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-[800px] h-auto mx-auto my-20 bg-slate-400 rounded-md">

      <form className="w-[70%] my-20 mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-[24px] font-semibold text-gray-900">Create Appointment</h2>

              <div className="mt-10 ">
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Date
                  </label>
                  <div className="mt-2">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={appointment.date}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                              outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Duration
                  </label>
                  <div className="mt-2">
                    <input
                      id="duration"
                      name="duration"
                      type="duration"
                      value={appointment.duration}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                              outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                  </div>
                </div>            

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-300 focus-visible:outline-2 f
                        ocus-visible:outline-offset-2 focus-visible:outline-slate-600">
            Submit
          </button>
        </div>

      </form>
    </div>
  )
}

export default Calendar