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

const AdminCalendar = ({ title }) => {
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
  const { data: session, status } = useSession();
  const id = session?.user.id
  const isAdmin = session?.user.role === "admin";
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    console.log("isAdmin", isAdmin);
    if (!isAdmin) {
      router.push("/unauthorized")
    } else {
      router.push("/admin")
    }
  }, [isAdmin])

  useEffect(() => {
    axios.get(`/api/auth/appointments/`)
      .then(res =>{setAppointments(res.data.appointments)})
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    Load()
  }, [session])

  function Load() {
    if (status === "loading" || !id) {
      return (
        <PageLoader />
      )
    }
  }

  const seeDetails = (apptId) => {
    router.push(`/appointment/${apptId}`)
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
    <div className="w-[1500px] h-[500px] mx-auto my-20 rounded-md border-[4px] border-gray-300 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] p-5">
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
          <div className="mt-2 grid grid-cols-7 text-sm bg-slate-50">
            {days.map((day, dayIdx) => (
              <div key={day.toString()} onClick={() => setSelectedDay(day)} 
                className={classNames(
                  isEqual(day, selectedDay) && 'bg-orange-100',
                  dayIdx === 0 && colStartClasses[getDay(day)], 'border border-gray-100 py-2 hover:bg-orange-100')}>
                <button
                  type="button"
                  className={classNames(
                    !isEqual(day, selectedDay) && isToday(day) && 'text-red-600',
                    !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                    !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                    isToday(day) && 'text-red-600',
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
        <section className="mt-12 md:mt-0 md:pl-14 bg-orange-100 rounded-sm p-5">
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
    </div>
  )
}

const Appointment = ({ appointment }) => {
  let startTime = parseISO(appointment.startDatetime)
  let endTime = parseISO(appointment.endDatetime)

  return (
    <li
      onClick={(e) => seeDetails(appointment._id)} className="group flex items-center gap-x-4 rounded-xl px-4 py-2 border-b focus-within:bg-gray-100 hover:bg-gray-100"
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

export default AdminCalendar