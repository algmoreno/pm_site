"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CalendarDaysIcon , UserIcon, DocumentTextIcon   } from '@heroicons/react/20/solid';
import { UserDetails, AppointmentList, Assignment } from '@/components/index';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';


const ProfileTabs = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: session, status } = useSession();
  const sessionId = session?.user.id
  const [currentTab, setCurrentTab] = useState("Profile")
  const [tabs, setTabs] = useState([
    { name: 'Profile', href: '#profile', icon: UserIcon, current: true },
    { name: 'Appointments', href: '#appointments', icon: CalendarDaysIcon , current: false },
    { name: 'Assignments', href: '#assignments', icon: DocumentTextIcon , current: false },
  ])

  // redirect if no user session
  useEffect(() => {
    if (!session) {
      router.push("/login")
    } else{
      router.push(`/profile/${id}`)
    }
  }, [session])
  
  // tab redirect
  const tabRedirect = (currentTab) => {
    setTabs((prevTabs) => 
      prevTabs.map((tab) => ({
        ...tab,
        current: tab.name === currentTab,
      }))
    )
    setCurrentTab(currentTab)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <div className="w-full mx-auto justify-center flex flex-wrap">
      <div className="w-full bg-blue-100 md:px-[20%] px-[5%] hover:cursor-pointer max-sm:hidden">
        <div className="border-b border-gray-200 m-auto ">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8 ">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={(e) => tabRedirect(tab.name)}
                className={classNames(
                  tab.current
                    ? 'border-gray-500 text-slate-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    tab.current ? 'text-sky-600' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-2 -ml-0.5 size-5',
                  )}
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-[90px] grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          onChange={(e) => tabRedirect(e.target.value)}
          defaultValue={tabs.find((tab) => tab.current).name}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 
                      -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
          {tabs.map((tab) => (
            <option value={tab.name} key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
        {currentTab === "Profile" && <UserDetails userId={id} />}
        {currentTab === "Appointments" && <AppointmentList userId={id} />}
        {currentTab === "Assignments" && <Assignment userId={id} />}
    </div>
  )
}

export default ProfileTabs;