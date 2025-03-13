"use client"
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/index';
import { toast } from "sonner";
import { format, startOfToday, eachDayOfInterval, eachHourOfInterval, startOfMonth, endOfMonth, endOfWeek, isToday,
  isSameDay, isSameMonth, isEqual, parse, add, addHours, set, getDay, parseISO, formatISO } from 'date-fns';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

const Calendar = ({ title }) => {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [selectedHour, setSelectedHour] = useState()
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date())
  let firstHourOfDay = set(selectedDay, { hours: 9 })
  let lastHourOfDay = set(selectedDay, { hours: 16 })
  let days = eachDayOfInterval({ start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)) })
  let hoursOfDay = eachHourOfInterval({ start: firstHourOfDay, end: lastHourOfDay })
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
  const appointmentRef = useRef({ startDatetime: null, endDatetime: null });
  const [appointment, setAppointment] = useState({
    userId: id,
    startDatetime: '',
    endDatetime: '',
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
      setAppointment((prevAppointment) => ({...appointment, userId: id }))
      console.log(appointment);
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

  const Slot = ({ hour }) => {
    const slotRef = useRef(null);
    let hourPlusOne = addHours(hour, 1)

    const handleSelect = () => {
      setSelectedHour(hour);
      setAppointment((prevAppt) => ({
        ...appointment,
        startDatetime: formatISO(hour),
        endDatetime: formatISO(hourPlusOne),
      }));

    }

    return (
      <div ref={slotRef} tabIndex="0" onClick={handleSelect}
        className={classNames(
          isEqual(hour, selectedHour) && 'bg-blue-200 border-2', 
          'col-span-1 items-center gap-x-4 rounded-xl px-4 py-2 focus:border-2 focus:outline-offset-2 focus:outline-blue-200 focus:bg-blue-200 hover:bg-blue-200 hover:cursor-pointer border border-black')}>
        <p className="mt-0.5 ">
          <time dateTime={hour}>{format(hour, 'hh:mm a')}</time>-{' '}
          <time dateTime={hourPlusOne}>{format(hourPlusOne, 'hh:mm a')}</time>
        </p>
      </div>
    )
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
          <div className="mt-2 grid grid-cols-7 text-sm bg-slate-50">
            {days.map((day, dayIdx) => (
              <div key={day.toString()} onClick={() => setSelectedDay(day)} 
                className={classNames(
                  isEqual(day, selectedDay) && 'bg-blue-100',
                  dayIdx === 0 && colStartClasses[getDay(day)], 'border border-gray-100 py-2 hover:bg-blue-100 hover:cursor-pointer')}>
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
        <section className="mt-12 md:mt-0 md:pl-14 bg-blue-100 rounded-sm p-5">
          <h2 className="text-base font-semibold text-gray-900">
            Available Sessions on <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMM dd, yyy')}</time>
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm/6 text-gray-500">
            {hoursOfDay.length !== selectedDayAppointments.length ? (
              hoursOfDay.map((hour, index) => (
                <Slot key={index} hour={hour}/>
              ))
            ) : (
              <p>No availability today.</p>
            )}
              
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-gray-900">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-300 focus-visible:outline-2 f
                          ocus-visible:outline-offset-2 focus-visible:outline-slate-600">
              Submit
            </button>
          </div>
        </section>
      </div>
    </div>          
  )
}



export default Calendar