"use client";

import { GenreColours } from '@/types';
import React, { useState } from "react";
import Image from "next/image";
import map from "../../public/glastonbury2024map.png";

type KeyProps = {
    genreColours: GenreColours;
}

export const Interactions = ({ genreColours }: KeyProps) => {
    const [popup, setPopup] = useState<"Key" | "Map" | null>(null);

    const interactions = ["Map", "Key"] as const;

    return (
        <>
            <div className="fixed bottom-5 right-5 flex gap-2">
                {interactions.map(interaction => (
                    <button key={interaction} className={`${interaction === popup ? "bg-sky-500 text-white" : "bg-white"} p-1 rounded-md shadow-lg w-12 h-11 flex items-center justify-center`} onClick={() => setPopup(p => p === interaction ? null : interaction)}>{interaction === popup ? <Close /> : interaction}</button>
                ))}
            </div>
            {popup === "Map" && (
                <div style={{ maxHeight: "calc(100% - 5.5rem" }} className="absolute right-1 left-1 bottom-20 box-border bg-white rounded-md p-4 shadow-lg flex flex-col gap-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/glastonbury2024map.png" alt="Glastonbury 2024 Map" />
                </div>
            )}
            {popup === "Key" && (
                <div className="absolute right-5 bottom-20 my-1 bg-white rounded-md p-4 shadow-lg flex flex-col gap-1">
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

const Close = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}