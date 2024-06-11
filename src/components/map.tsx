"use client";

import React, { useState } from "react";

export const Map = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-5 right-5 bg-white p-1 rounded-md shadow-lg w-12 h-11 flex items-center justify-center">
                <button onClick={() => setIsOpen(!isOpen)}>Map</button>
            </div>
            {isOpen && (
                <div className="absolute right-5 bottom-16 my-1 bg-white rounded-md p-4 shadow-lg flex flex-col gap-1">
                    <img src="/glastonbury2024map.png" alt="Glastonbury 2024 Map" className="w-full h-full" />
                </div>
            )}
        </>
    )
}