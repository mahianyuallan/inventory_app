"use client";

import { useAppDispatch, useAppSelectore } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import usePagination from '@mui/material/usePagination/usePagination';
import { Archive, CircleDollarSign, Clipboard, Icon, Layout, LucideIcon, Menu, Settings, SlidersHorizontal, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SideBarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}
const SideBarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed
}: SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname ==="/" && href === "dashboard");


return (
  
    <Link href={href}>
      <div className={`cursor-pointer flex items-center ${
        isCollapsed? "justify-center py-4" : "justify-start px-8 py-4"
      }
      hover:text-blue-500 hover:bg-blue-100 gap=3 transition-colors ${
        isActive ? "bg-blue-200 text-white" : ""
      }
      `}>
        <Icon className='w-6 h-6 text-gray-700' />

        <span className={`${isCollapsed ? "hidden" : "block"} 
        font-medium text-gray-700 pl-3`
        }>
          {label}
        </span>
      
      </div>
    </Link>
)
};

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelectore(
    (state)=> state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  

  return (
    <div className={sidebarClassNames}>
      {/* Top Logo */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
        isSidebarCollapsed ? "px-5":"px-8"
        }`}>
        <div>logo</div>
        <h1 className={`${isSidebarCollapsed? "hidden" : "block"} font-extrabold text-2xl`}>InventoVault</h1>
      
      <button 
        className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' 
        onClick={toggleSidebar}
        >
          <Menu className='w-4 h-4' />
      </button>
      </div>

      {/* Links */}
      <div className='flex-grow mt-8'>

        {/* Links here */}
      <SideBarLink 
      href="/dashboard"
      icon={Layout}
      label='Dashboard'
      isCollapsed={isSidebarCollapsed}
      />

      <SideBarLink 
      href="/inventory"
      icon={Archive}
      label='Inventory'
      isCollapsed={isSidebarCollapsed}
      />

      <SideBarLink 
      href="/products"
      icon={Clipboard}
      label='Products'
      isCollapsed={isSidebarCollapsed}
      />

      <SideBarLink 
      href="/users"
      icon={User}
      label='Users'
      isCollapsed={isSidebarCollapsed}
      />

      <SideBarLink 
      href="/settings"
      icon={SlidersHorizontal}
      label='Settings'
      isCollapsed={isSidebarCollapsed}
      />

      <SideBarLink 
      href="/expenses"
      icon={CircleDollarSign}
      label='Expenses'
      isCollapsed={isSidebarCollapsed}
      />

      </div>

      {/* Footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className='text-center text-xs text-grey-500'>&copy; 2024 Inventory App</p>
      </div>

    </div>
  )
}

export default Sidebar