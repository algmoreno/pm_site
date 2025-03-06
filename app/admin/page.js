import React from 'react'
import { UserList, AppointmentList } from '@/components/index';

const Admin = () => {
  return (
    <div className="flex flex-wrap m-auto">
      <UserList />
      <AppointmentList />
    </div>
  )
}

export default Admin