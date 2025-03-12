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

const Calendar = () => {
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
  const [appointment, setAppointment] = useState({
    date: '',
    duration: '',
    price: 50,
    userId: id
  });

  const meetings = [
    {
      id: 1,
      name: 'Leslie Alexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2025-03-11T13:00',
      endDatetime: '2025-03-11T14:30',
    },
    // More meetings...
  ]
  
  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else{
      // router.push(`/schedule`)
    }
  }, [session])

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
      const response = await axios.post('/api/auth/appointments', appointment);
      if (response.status == 201) {
        emailjs.send(
          'service_qjdjgk9',
          'template_w5n6h43',
          {
            from_name: "Appointment Manager",
            to_name: 'Alan',
            to_email: 'alg.moreno00@gmail.com',
            message: `${appointment.duration} min. session booked for ${name} at ${appointment.date}`,
          }, 'GDA7yUKvlEcVbask0')
          .then(() => {
            setPending(false);        
            setAppointment({
              date: '',
              duration: '',
              price: 50,
              userId: id
            })
            toast.success(`Appointment confirmed! See details.`)
          }, (error) => {
            setPending(false);
            console.log(error);
            toast.error("Something went wrong.")
          })
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

  let selectedDayMeetings = meetings.filter((meeting) => isSameDay(parseISO(meeting.startDatetime), selectedDay))

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
        <div className="mt-10 grid grid-cols-7 text-center text-xs/6 text-gray-500">
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
                {meetings.some((meeting) => isSameDay(parseISO(meeting.startDatetime), day)
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
          {selectedDayMeetings.length > 0 ? (
            selectedDayMeetings.map((meeting) => (
              <Meeting key={meeting.id} meeting={meeting} />
            ))
          ) : (
            <p>No meetings today.</p>
          )}
            
        </ol>
      </section>
    </div>
    </div>
  )
}

function Meeting({ meeting }) {
  let startDateTime = parseISO(meeting.startDatetime)
  let endDateTime = parseISO(meeting.endDatetime)

  return (
    <li
      className="group flex items-center gap-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
      >
      <img src={meeting.imageUrl} alt="" className="size-10 flex-none rounded-full" />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>{format(startDateTime, 'hh:mm a')}</time> -{' '}
          <time dateTime={meeting.endDatetime}>{format(endDateTime, 'hh:mm a')}</time>
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