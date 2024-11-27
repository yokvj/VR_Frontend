import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
<div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

    <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to="/addUser">
<img className='w-5 h-5' src={assets.add_icon} alt="" />
<p className='hidden md:block'>Add Users</p>
    </NavLink>

    <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to="/listUser">
<img className='w-5 h-5' src={assets.list} alt="" />
<p className='hidden md:block'>List Users</p>
    </NavLink>
    <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg" to="/RoleManagement">
<img className='w-5 h-5' src={assets.list} alt="" />
<p className='hidden md:block'>Role</p>
    </NavLink>
</div>

    </div>
  )
}

export default sidebar