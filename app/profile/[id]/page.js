import React from 'react'
import { UserDetails, Assignment } from '@/components/index';

const Profile = () => {
  return (
    <div className="flex flex-wrap m-auto bg-slate-200">
      <UserDetails />
      <Assignment />
    </div>
  )
}

export default Profile