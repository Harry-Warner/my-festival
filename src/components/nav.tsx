"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react';

const days = ['Thursday', 'Friday', 'Saturday', 'Sunday'];

const getPathNameForDay = (day: typeof days[number]) => `/days/${day.toLowerCase()}`;

export const NavBar = () => {
  const pathname = usePathname();
  return (
    <>
        <div className="flex justify-around w-screen fixed bg-indigo-500">
            {days.map((day) => (
                <Link key={day} className={`${pathname === getPathNameForDay(day.toLowerCase()) ? "text-indigo-200" : "text-white"} h-8 flex items-center`} href={getPathNameForDay(day)}>{day}</Link>
            ))}
        </div>
        <div className="h-8"/>
    </>
  )
}
