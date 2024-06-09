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
        <div className="grid grid-flow-col auto-cols-fr w-screen fixed bg-sky-500">
            {days.map((day) => (
                <Link key={day} className={`${pathname === getPathNameForDay(day.toLowerCase()) ? "bg-sky-200" : "text-white"} h-10 flex items-center justify-center w-100`} href={getPathNameForDay(day)}>{day}</Link>
            ))}
        </div>
        <div className="min-h-10 w-screen"/>
    </>
  )
}
