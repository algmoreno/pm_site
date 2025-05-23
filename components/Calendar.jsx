"use client"
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/index';
import { toast } from "sonner";
import { format, startOfToday, eachDayOfInterval, eachHourOfInterval, startOfMonth, endOfMonth, endOfWeek, isToday,
  isSameHour, isSameDay, isSameMonth, isEqual, isBefore, parse, add, addHours, set, getDay, parseISO, formatISO } from 'date-fns';
import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { EllipsisVerticalIcon, CheckIcon  } from '@heroicons/react/24/outline';
import { zoomOptions } from '@/constants';
import { EnterAnimation } from '@/hoc/index';


const Calendar = ({ title }) => {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [selectedHour, setSelectedHour] = useState(null)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date())
  let firstHourOfDay = set(selectedDay, { hours: 9 })
  let lastHourOfDay = set(selectedDay, { hours: 16 })
  let hoursOfDay = eachHourOfInterval({ start: firstHourOfDay, end: lastHourOfDay })
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false)
  const [highlightSelect, setHighlightSelect] = useState(false);
  const [reload, setReload] = useState(false);
  const userId = session?.user.id
  const name = session?.user.firstName + " " + session?.user.lastName
  const email = session?.user.email
  const [appointment, setAppointment] = useState({
    userId: userId,
    startDatetime: '',
    endDatetime: '',
    service: '',
    price: 50,
  });

  // redirect if no user session
  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else{
      router.push(`/schedule`)
      setAppointment((prevAppointment) => ({...appointment, userId: userId }))
    }
  }, [session])

  // get all appointments
  useEffect(() => {
    axios.get(`/api/auth/appointments/`)
      .then(res =>{setAppointments(res.data.appointments); setLoading(false)})
      .catch(err => console.error(err));
  }, []);
  
  // submit appointment to api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirm(false)
    setHighlightSelect(false);
    setSelectedHour(null)

    try {
      // add appt to db
      const response = await axios.post('/api/auth/appointments', appointment);
      if (response.status == 201) {
        toast.success(`Appointment scheduled for ${format(appointment.startDatetime, "MMMM dd, yyyy")} 
        from ${format(appointment.startDatetime, "h:mm a")} to ${format(appointment.endDatetime, "h:mm a")}`)
        // pull all appointments again
        axios.get(`/api/auth/appointments/`)
        .then(res =>{setAppointments(res.data.appointments)})
        .catch(err => console.error(err));

        // create zoom meeting
        // const response = await fetch("/api/auth/zoom", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: email, 
        //     startDatetime: appointment.startDatetime, 
        //   }),
        // });
    
        // const data = await response.json();
        // console.log("Meeting Created:", data);
        // const zoomJoinUrl = data.join_url;

        // send confirmation email
        // emailjs.send(
        //   'service_qjdjgk9',
        //   'template_w5n6h43',
        //   {
        //     from_name: "PM Yoga Appointment Manager",
        //     to_name: name,
        //     to_email: email, //add paula email
        //     message: `Appointment booked for ${name} on ${format(appointment.startDatetime, "MMMM dd, yyyy")} ${format(appointment.startDatetime, "h:mm a")}-${format(appointment.endDatetime, "h:mm a")}. 
        //     Join Zoom meeting here: ${zoomJoinUrl}`,
        //   }, 'GDA7yUKvlEcVbask0')
        //   .then(() => {
        //     setPending(false);        
        //     setAppointment({
        //       userId: userId,
        //       startDatetime: '',
        //       endDatetime: '',
        //       price: 50,
        //     })
        //   }, (error) => {
        //     setPending(false);
        //     console.log(error);
        //     toast.error("Confirmation email failed to send.")
        //   }
        // )
      }

    } catch (err) {
      toast.error("Something went wrong. Try again.") 
      console.log(err);
    }
  }

  const handleConfirm = () => {
    if (selectedHour == null) {
      toast.error("Must select a time slot.")
    } else if (appointment.service == "Select" || appointment.service == "") {
      setHighlightSelect(true);
      toast.error("Must select an appointment type.")
    }
    else {
      setShowConfirm(true)
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

  let now = new Date()
  let selectedDayAppointments = appointments.filter((appointment) => isSameDay(parseISO(appointment.startDatetime), selectedDay))
  let availableHours = hoursOfDay.filter((hour) => !selectedDayAppointments.some((appointment) => isSameHour(parseISO(appointment.startDatetime), hour)))
  let isBeforeToday = isBefore(selectedDay, now)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // Time slot component
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
          isEqual(hour, selectedHour) && 'bg-gray-200 border-2', 
          'col-span-1 items-center gap-x-4 rounded-xl px-4 py-2 focus:border-2 focus:outline-offset-2 focus:outline-gray-200 focus:bg-gray-200 hover:bg-gray-200 hover:cursor-pointer border border-white')}>
        <p className="mt-0.5 ">
          <time dateTime={hour}>{format(hour, 'hh:mm a')}</time>-{' '}
          <time dateTime={hourPlusOne}>{format(hourPlusOne, 'hh:mm a')}</time>
        </p>
      </div>
    )
  }

  // Confirm appt modal component 
  const ConfirmModal = () => {
    return (
      <Dialog open={showConfirm} onClose={setShowConfirm} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:data-closed:translate-y-0 sm:data-closed:scale-95"
            >
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Confirm appointment
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {appointment.startDatetime != '' && format(appointment.startDatetime, "M/dd/yyyy h:mm a")} - {appointment.endDatetime != '' && format(appointment.endDatetime, "M/dd/yyyy h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-2xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setShowConfirm(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-2xs ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    )
  }

  return (
    <div id="calendar" className="w-full max-w-[1500px] mx-auto p-2 sm:p-5 max-sm:mt-[25%]">
      {!loading ? (
      <div>
        <h2 className="text-[24px] text-gray-900 mb-5 border-b">Book A Session</h2>
        <div className="flex flex-col md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="w-full md:w-auto md:pr-14">
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
                      'max-md:h-4 mx-auto flex size-8 items-center justify-center rounded-full',
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section className="w-full md:w-auto mt-12 md:mt-0 md:pl-14 bg-2 rounded-sm p-2 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-base font-semibold text-gray-900">
                Available Sessions on <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMM dd, yyy')}</time>
              </h2>
              <div className="flex gap-5 ml-auto">
                {!isBeforeToday &&
                <div className="grid grid-cols-1">
                  <select
                    id="service"
                    name="service"
                    defaultValue="Select"
                    onChange={(e) => setAppointment({ ...appointment, service: e.target.value})}
                    className="col-start-1 row-start-1 w-full flex-wrap appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6">
                    <option>Select</option>
                    <option>Yoga</option>
                    <option>Yoga Therapy</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"/>
                </div>
                }
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm/6 text-gray-700">
              {availableHours.length > 0 && !isBeforeToday ? (
                availableHours.map((hour, index) => (
                  <Slot key={index} hour={hour}/>
                ))
              ) : (
                <p>No availability today.</p>
              )}
            </div>
            {availableHours.length > 0 && !isBeforeToday ? (
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={() => {setSelectedHour(null); setHighlightSelect(false)}} type="button" className="text-sm/6 font-semibold text-gray-900">
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  type="submit"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">
                  Submit
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </section>
          <ConfirmModal />
        </div>
      </div>
      ) : (
        <PageLoader />
      )}
    </div> 
  )
}

export default EnterAnimation(Calendar)