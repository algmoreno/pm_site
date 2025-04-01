"use client";
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { PageLoader } from '@/components/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { format, addHours, parse, add, parseISO, formatISO, differenceInHours, isBefore, startOfToday } from 'date-fns';
import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { EllipsisVerticalIcon, CheckIcon } from '@heroicons/react/24/outline'
import { MdEdit, MdDelete } from "react-icons/md";

const AppointmentList = ({ userId }) => {
  const router = useRouter();
  let today = new Date();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const isAdmin = session?.user.role === "admin";
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [newDatetime, setNewDatetime] = useState();
  
  // get user
  useEffect(() => {
    if (userId) {
      axios.get(`/api/auth/users/${userId}`)
      .then(res =>{setUser(res.data.user); setLoading(false)})
      .catch(err => console.error(err));
    }
  }, [userId]);

  let now = new Date();
  let nonPastAppointments = user?.appointments.filter((appointment) => differenceInHours(parseISO(appointment.startDatetime), now) >= -1);
  const orderedAppointments = (nonPastAppointments?.length > 0 
    ? [...nonPastAppointments].sort((a, b) => new Date(a.startDatetime) - new Date(b.startDatetime)) 
    : []) ?? [];

  const seeDetails = (apptId) => {
      router.push(`/appointment/${apptId}`)
  }

  // const editAppointment = async () => {
  //   const apptId = selectedAppointment._id;
  //   let hourPlusOne = addHours(newDatetime, 1)
  
  //   setSelectedAppointment(prev => {
  //       const updatedAppointment = {
  //           ...prev,
  //       startDatetime: formatISO(newDatetime),
  //       endDatetime: formatISO(addHours(newDatetime, 1)),
  //     };
  //     console.log(updatedAppointment);
  //     axios.put(`/api/auth/appointments/${apptId}`, updatedAppointment)
  //       .then(response => console.log("Appointment updated:", response.data))
  //       .catch(error => console.error("Error updating appointment:", error));

  //     return updatedAppointment;
  //   });

  //   // pull user and populate appointments !!
  //   // reload appointments
  //   axios.get(`/api/auth/appointments/`)
  //   .then(res =>{setAppointments(res.data.appointments)})
  //   .catch(err => console.error(err));
  //   setShowEdit(false)
  //   toast.success("Changes saved.")
  // }

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

  // // Edit appt modal component 
  // const EditModal = () => {
  //   const now = formatISO(new Date());
  //   const isWithin24Hours = selectedAppointment
  //   ? differenceInHours(formatISO(selectedAppointment.startDatetime), now) <= 24
  //   : false;

  //   return (
  //     <Dialog open={showEdit} onClose={setShowEdit} className="relative z-10">
  //       <DialogBackdrop
  //         transition
  //         className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
  //       />

  //       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  //         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  //           <DialogPanel
  //             transition
  //             className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
  //           >
  //             <div>
  //               <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-100">
  //                 <MdEdit aria-hidden="true" className="size-6 text-amber-600" />
  //               </div>
  //               <div className="mt-3 text-center sm:mt-5">
  //                 <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
  //                   Edit appointment
  //                 </DialogTitle>
  //                 {!isWithin24Hours ? (
  //                 selectedAppointment !== null &&
  //                 <div className="mt-4 grid grid-cols-2 gap-2 text-sm/6 text-gray-700">
  //                 {availableHours.length > 0 && !isBeforeToday ? (
  //                   availableHours.map((hour, index) => (
  //                     <Slot key={index} hour={hour}/>
  //                   ))
  //                 ) : (
  //                   <p>No availability today.</p>
  //                 )}
  //               </div>
  //                 ) 
  //                 : (
  //                   <p className="text-[14px]">Unable to reschedule within 24 hrs. of appointment.</p>
  //                 ) }

  //               </div>
  //             </div>
  //             <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
  //               <button
  //                 type="button"
  //                 onClick={editAppointment}
  //                 className="mt-3 inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
  //               >
  //                 Submit
  //               </button>
  //               <button
  //                 type="button"
  //                 data-autofocus
  //                 onClick={() => setShowEdit(false)}
  //                 className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
  //               >
  //                 Cancel
  //               </button>
  //             </div>
  //           </DialogPanel>
  //         </div>
  //       </div>
  //     </Dialog>
  //   )
  // }

  // Delete appt modal component 
  const DeleteModal = () => {
    const now = formatISO(new Date());
    const isWithin24Hours = selectedAppointment
    ? differenceInHours(formatISO(selectedAppointment.startDatetime), now) <= 24
    : false;

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
                  {!isWithin24Hours ? (
                    <p className="text-[14px]">Are you sure you want to delete this appointment?</p>
                  ) 
                  : (
                    <p className="text-[14px]">Unable to cancel within 24 hrs. of appointment.</p>
                  ) }
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => deleteAppointment()}
                  disabled={isWithin24Hours}
                  className={`${isWithin24Hours ? 'bg-gray-200 hover:cursor-default' : 'bg-red-700 hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'} mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:col-start-2`}>
                  Delete
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setShowDelete(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 
                  shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0">
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
    <div className="w-[1400px] flex flex-wrap mx-auto mt-[100px] mb-[5%] p-5 rounded-md">
      {!loading ? (
        <div>
        <div className="text-[24px] border-b-2 border-gray-900">
          <h1 className="mb-2 text-gray-900">Upcoming Appointments</h1>
        </div>
        <ul role="list" className="relative flex flex-wrap mt-5 gap-4 divide-y">
          {orderedAppointments.map((appointment, index) => (
          <li key={appointment._id} className="w-[300px] group flex items-center bg-white rounded-md gap-x-4 px-4 py-4 border-2 border-gray-300 focus-within:bg-gray-100 hover:bg-gray-100">
            <div onClick={(e) => seeDetails(appointment._id)} className="flex-auto">
              <p className="text-gray-900">{format(parseISO(appointment.startDatetime), 'MMMM dd, yyyy')}</p>
              <p className="mt-0.5">
                <time dateTime={appointment.startDatetime}>{format(parseISO(appointment.startDatetime), 'h:mm a')}</time> -{' '}
                <time dateTime={appointment.endDatetime}>{format(parseISO(appointment.endDatetime), 'h:mm a')}</time>
              </p>
            </div> 
            <Menu as="div" className="relative group-hover:opacity-100 focus-within:opacity-100">
              <div>
                <MenuButton className="relative -m-2 flex items-center rounded-full p-1.5 text-black hover:text-gray-600">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="size-6" aria-hidden="true" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hover:cursor-pointer 
                  focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">
                  <MenuItem className="hover:bg-gray-200">
                    <p
                      onClick={(e) => {setSelectedAppointment(appointment); setShowDelete(true)}}
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900">
                      Cancel Appointment
                    </p>                
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </li>
          ))}
        </ul>
        <DeleteModal />
        </div>
      ) : (
        <PageLoader />
      )}
      
      
    </div>
  )
}

export default AppointmentList