import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'

const AdminSidebar = () => {

  const user = {
  firstName:'Admin',
  lastName : 'User',
  imageUrl: assets.profile,
   }

   const adminNavLinks = [
    {name:'Dashboard', path:'/admin',icon:LayoutDashboardIcon},
    {name:'Add Shows', path:'/admin/add-shows',icon:PlusSquareIcon},
    {name:'List Shows', path:'/admin/lisi-shows',icon:ListIcon},
    {name:'List Bookings', path:'/admin/list-bookings',icon:ListCollapseIcon},
   ]

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
      
    </div>
  )
}

export default AdminSidebar
