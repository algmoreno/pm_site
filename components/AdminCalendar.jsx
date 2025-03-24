"use client"
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/index';
import { toast } from "sonner";
import { format, startOfToday, eachDayOfInterval, startOfMonth, endOfMonth, endOfWeek, isToday, addHours,
  isSameDay, isSameMonth, isEqual, parse, add, getDay, parseISO, formatISO } from 'date-fns';
import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { EllipsisVerticalIcon, CheckIcon } from '@heroicons/react/24/outline'
import { MdEdit, MdDelete } from "react-icons/md";

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
  const userId = session?.user.id
  const isAdmin = session?.user.role === "admin";
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [newDatetime, setNewDatetime] = useState();
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  
  useEffect(() => {
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
    if (status === "loading" || !userId) {
      return (
        <PageLoader />
      )
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

  const editAppointment = async () => {
    const apptId = selectedAppointment._id;
    let hourPlusOne = addHours(newDatetime, 1)

    setSelectedAppointment(prev => {
      const updatedAppointment = {
        ...prev,
        startDatetime: formatISO(newDatetime),
        endDatetime: formatISO(addHours(newDatetime, 1)),
      };
      console.log(updatedAppointment);
      axios.put(`/api/auth/appointments/${apptId}`, updatedAppointment)
        .then(response => console.log("Appointment updated:", response.data))
        .catch(error => console.error("Error updating appointment:", error));

      return updatedAppointment;
    });

    // reload appointments
    axios.get(`/api/auth/appointments/`)
    .then(res =>{setAppointments(res.data.appointments)})
    .catch(err => console.error(err));
    setShowEdit(false)
    toast.success("Changes saved.")
  }

  const deleteAppointment = async () => {
    const apptId = selectedAppointment._id;
    const params = { id: apptId }
    const response = await axios.delete(`/api/auth/appointments/${apptId}`, { data: { userId } });
    // reload appointments
    axios.get(`/api/auth/appointments/`)
    .then(res =>{setAppointments(res.data.appointments)})
    .catch(err => console.error(err));
    setShowDelete(false)
    setSelectedAppointment(null);
    toast.success("Removed appointment.")
  }

  // Edit appt modal component 
  const EditModal = () => {
    return (
      <Dialog open={showEdit} onClose={setShowEdit} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-100">
                  <MdEdit aria-hidden="true" className="size-6 text-amber-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Edit appointment
                  </DialogTitle>
                  {selectedAppointment !== null &&
                  <form className="mt-2">
                    <input
                      type="datetime-local"
                      id="meeting-time"
                      name="meeting-time"
                      value={newDatetime}
                      onChange={(e) => setNewDatetime((prevDate) => e.target.value)} />
                  </form>
                  }
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={editAppointment}
                  className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setShowEdit(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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

  // Delete appt modal component 
  const DeleteModal = () => {
    return (
      <Dialog open={showDelete} onClose={setShowDelete} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
                  <MdDelete aria-hidden="true" className="size-6 text-red-600"  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Delete Appointment
                  </DialogTitle>
                  <p className="text-[14px]">Are you sure you want to delete this appointment?</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => deleteAppointment()}
                  className="inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setShowDelete(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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

  const AppointmentCard = ({ appointment }) => {
    let startTime = parseISO(appointment.startDatetime)
    let endTime = parseISO(appointment.endDatetime)
  
    const seeDetails = (apptId) => {
      router.push(`/appointment/${apptId}`)
    }
  
    return (
      <li className="group flex items-center gap-x-4 rounded-xl px-4 py-2 border-b focus-within:bg-gray-100 hover:bg-gray-100">
        <div onClick={(e) => seeDetails(appointment._id)} className="flex-auto">
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
            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hover:cursor-pointer focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <p
                  onClick={() => {setShowEdit(true); setSelectedAppointment(appointment)}}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900">
                  Edit
                </p>
              </MenuItem>
              <MenuItem>
                <p
                  onClick={(e) => {setShowDelete(true); setSelectedAppointment(appointment)}}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900">
                  Delete
                </p>                
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

  return (
    <div className="w-[1500px] mx-auto mb-[5%] mt-[150px] rounded-md border-[4px] border-gray-300 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] p-5">
      <div className="md:grid md:grid-cols-2 max-md:flex-wrap md:divide-x md:divide-gray-200">
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
                    'max-md:h-4 mx-auto flex size-8 items-center justify-center rounded-full',
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
        <section className="mt-12 md:mt-0 md:pl-14 max-md:my-5 bg-orange-100 rounded-sm p-5">
          <h2 className="text-base font-semibold text-gray-900">
            Schedule for <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMM dd, yyy')}</time>
          </h2>
          <ol className="mt-4 flex flex-col gap-y-1 text-sm/6 text-gray-500">
            {selectedDayAppointments.length > 0 ? (
              selectedDayAppointments.map((appointment) => (
                <AppointmentCard key={appointment._id} appointment={appointment} />
              ))
            ) : (
              <p>No appointments today.</p>
            )}
              
          </ol>
        </section>
        <EditModal />
        <DeleteModal />
      </div>
    </div>
  )
}



export default AdminCalendar