"use client";

import { GenreColours } from '@/types';
import React, { useState } from "react";

type KeyProps = {
    genreColours: GenreColours;
}

export const Key = ({ genreColours }: KeyProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-10 right-10 bg-white p-1 rounded-md shadow-lg w-12 h-11 flex items-center justify-center">
                <button onClick={() => setIsOpen(!isOpen)}>Key</button>
            </div>
            {isOpen && (
                <div className="absolute right-10 bottom-24 bg-white rounded-md p-4 shadow-lg flex flex-col gap-1">
                    {Object.entries(genreColours).map(([genre, colour]) => (
                        <div key={genre} className="flex items-center gap-2">
                            <div className="w-3 h-3" style={{ backgroundColor: colour }}/>
                            <span>{genre}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}