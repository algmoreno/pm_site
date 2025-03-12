"use client"
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/index';
import { toast } from "sonner";
import { format, startOfToday, eachDayOfInterval, startOfMonth, endOfMonth, endOfWeek, isToday,
  isSameDay, isSameMonth, isEqual, parse, add, getDay, parseISO } from 'date-fns';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

const Calendar = ({ title }) => {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date())
  let days = eachDayOfInterval({ start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)) })
  let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

  const router = useRouter();
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const [pending, setPending] = useState(false);
  const id = session?.user.id
  const name = session?.user.firstName + " " + session?.user.lastName
  const email = session?.user.email
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({
    userId: id,
    startDatetime: '2025-03-12T15:00',
    endDatetime: '2025-03-12T16:00',
    price: 50,
  });
  
  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else{
      router.push(`/schedule`)
    }
  }, [session])

  useEffect(() => {
    axios.get(`/api/auth/appointments/`)
      .then(res =>{setAppointments(res.data.appointments)})
      .catch(err => console.error(err));
  }, []);

  if (status === "loading" || !id) {
    return (
      <PageLoader />
    )
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
      console.log(appointment)
      setAppointment((prevAppointment) => ({...appointment, userId: id}))
      const response = await axios.post('/api/auth/appointments', appointment);
      console.log(response);
      if (response.status == 201) {
        // emailjs.send(
        //   'service_qjdjgk9',
        //   'template_w5n6h43',
        //   {
        //     from_name: "Appointment Manager",
        //     to_name: 'Alan',
        //     to_email: 'alg.moreno00@gmail.com',
        //     message: `${appointment.duration} min. session booked for ${name} at ${appointment.date}`,
        //   }, 'GDA7yUKvlEcVbask0')
        //   .then(() => {
        //     setPending(false);        
        //     setAppointment({
        //       date: '',
        //       duration: '',
        //       price: 50,
        //       userId: id
        //     })
        //     toast.success(`Appointment confirmed! See details.`)
        //   }, (error) => {
        //     setPending(false);
        //     console.log(error);
        //     toast.error("Something went wrong.")
        //   })
      }

    } catch (err) {
      console.log(err);
    }
  }
  
  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }

  const prevMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
  }

  let selectedDayAppointments = appointments.filter((appointment) => isSameDay(parseISO(appointment.startDatetime), selectedDay))

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="w-[1500px] h-[600px] mx-auto my-20 rounded-md border-[4px] border-gray-300 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] p-5">
      <h2 className="text-[24px] text-gray-900 my-5 border-b">Book A Session</h2>
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
      <div className="md:pr-14">
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-semibold text-gray-900">
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={prevMonth}
            type="button"
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="size-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs/6 text-gray-600">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div key={day.toString()} className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day)], 'border border-gray-100 py-2')}>
              <button
                onClick={() => setSelectedDay(day)}
                type="button"
                className={classNames(
                  isEqual(day, selectedDay) && 'text-white',
                  !isEqual(day, selectedDay) && isToday(day) && 'text-red-600',
                  !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                  !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                  isEqual(day, selectedDay) && isToday(day) && 'bg-red-600',
                  isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                  !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                  (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                  'mx-auto flex size-8 items-center justify-center rounded-full',
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>
              <div className="w-1 h-1 mx-auto mt-1">
                {appointments.some((appointment) => isSameDay(parseISO(appointment.startDatetime), day)
                ) && (
                  <div className="w-1 h-1 rounded-full bg-sky-600"></div>
                )}
              </div>
              
              
            </div>
          ))}
        </div>
      </div>
      <section className="mt-12 md:mt-0 md:pl-14 bg-orange-50 p-5">
        <h2 className="text-base font-semibold text-gray-900">
          Schedule for <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMM dd, yyy')}</time>
        </h2>
        <ol className="mt-4 flex flex-col gap-y-1 text-sm/6 text-gray-500">
          {selectedDayAppointments.length > 0 ? (
            selectedDayAppointments.map((appointment) => (
              <Appointment key={appointment._id} appointment={appointment} />
            ))
          ) : (
            <p>No appointments today.</p>
          )}
            
        </ol>
      </section>
    </div>
      <form className="w-[70%] my-20 mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-[24px] font-semibold text-gray-900">Create Appointment</h2>

              <div className="mt-10 ">

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Start Date
                  </label>
                  <div className="mt-2">
                    <input
                      id="startDatetime"
                      name="startDatetime"
                      type="date"
                      value={appointment.startDatetime}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                              outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    End Date
                  </label>
                  <div className="mt-2">
                    <input
                      id="endDatetime"
                      name="endDatetime"
                      type="date"
                      value={appointment.endDatetime}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-[50%] m-auto rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                              outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"/>
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

function Appointment({ appointment }) {
  let startTime = parseISO(appointment.startDatetime)
  let endTime = parseISO(appointment.endDatetime)

  return (
    <li
      className="group flex items-center gap-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
      >
      <div className="flex-auto">
        <p className="text-gray-900">{appointment.user.firstName} {appointment.user.lastName}</p>
        <p className="mt-0.5">
          <time dateTime={appointment.startDatetime}>{format(startTime, 'hh:mm a')}</time> -{' '}
          <time dateTime={appointment.endDatetime}>{format(endTime, 'hh:mm a')}</time>
        </p>
      </div>
      <Menu as="div" className="relative opacity-0 group-hover:opacity-100 focus-within:opacity-100">
        <div>
          <MenuButton className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="size-6" aria-hidden="true" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
              >
                Edit
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
              >
                Cancel
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </li>
  )
}

export default Calendar