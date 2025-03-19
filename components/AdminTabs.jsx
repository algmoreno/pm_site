"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon } from '@heroicons/react/20/solid';
import { UserList, AdminCalendar, AppointmentList } from '@/components/index';


const AdminTabs = () => {
  const [scheduleTab, setScheduleTab] = useState(true);
  const [tabs, setTabs] = useState([
    { name: 'Your Schedule', href: '/about', icon: BuildingOfficeIcon, current: true },
    { name: 'Users', href: '#users', icon: UsersIcon, current: false },
  ])
    
  const tabRedirect = (currentTab) => {
    setTabs((prevTabs) => 
      prevTabs.map((tab) => ({
        ...tab,
        current: tab.name === currentTab,
      }))
    )
    setScheduleTab(currentTab === "Your Schedule")
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <div className="w-full h-[auto] mx-auto mt-[5%] mb-18 justify-center flex flex-wrap">
      <div className="bg-orange-50 w-full md:px-[20%] px-[5%] hover:cursor-pointer">
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
      {scheduleTab ? (<AdminCalendar />) : (<UserList />)}
    </div>
  )
}

export default AdminTabs