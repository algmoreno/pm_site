"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CalendarDaysIcon , UserIcon, DocumentTextIcon   } from '@heroicons/react/20/solid';
import { UserDetails, AppointmentList, Assignment } from '@/components/index';


const AdminTabs = () => {
  const [currentTab, setCurrentTab] = useState("Profile")
  const [tabs, setTabs] = useState([
    { name: 'Profile', href: '#profile', icon: UserIcon, current: true },
    { name: 'Appointments', href: '#appointments', icon: CalendarDaysIcon , current: false },
    { name: 'Assignments', href: '#assignments', icon: DocumentTextIcon , current: false },
  ])
    
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
    <div className="w-full mt-[5%] mx-auto justify-center flex flex-wrap">
      <div className="fixed z-10 top-[100px] bg-blue-100 w-full md:px-[20%] px-[5%] hover:cursor-pointer">
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
        {currentTab === "Profile" && <UserDetails />}
        {currentTab === "Appointments" && <AppointmentList />}
        {currentTab === "Assignments" && <Assignment />}
    </div>
  )
}

export default AdminTabs