import React from 'react';
import { NavBar } from '@/components/nav';
import fs from "fs";
import path from 'path';
import { Interactions } from '@/components/interactions';
import { Lineup, literal, Event } from '@/types';

export default async function Day({ params }: { params: { slug: string } }) {
  const lineup = await fs.promises.readFile(path.join(process.cwd(), "public", "glastonbury2024.csv"), "utf-8");
  const config = await fs.promises.readFile(path.join(process.cwd(), "public", "config.json"), "utf-8");
  const parsedData = lineup.split("\n").slice(1);
  const allEvents: Event[] = [];
  for (const line of parsedData) {
    if (!line) continue;
    const [artist, day, time, stage, genre] = line.split(",");
    allEvents.push({ day, time: literal.parse(time), stage, artist, genre: genre.trim() });
  }
  const { dayStartAt, dayEndAt, stages, genreColours } = JSON.parse(config) as Lineup;
  const events = allEvents.filter((event) => event.day?.toLowerCase() === params.slug?.toLowerCase());
  const hourStart = parseInt(dayStartAt.split(":")[0]);
  const hourEnd = parseInt(dayEndAt.split(":")[0]);
  const hours = hourEnd < hourStart ? Array.from({ length: 24 - hourStart + hourEnd + 1 }, (_, i) => (hourStart + i) % 24) : Array.from({ length: hourEnd - hourStart + 1 }, (_, i) => hourStart + i);

  return (
    <div className="flex flex-col max-w-screen max-h-screen overflow-hidden">
        <NavBar />
        <div className="max-w-screen gap-0.5 overflow-auto" style={{
            display: "grid",
            gridTemplateColumns: ` 44px repeat(${stages.length}, 10rem)`,
            gridTemplateRows: `44px repeat(${(hours.length * 4) + 1}, 8px)`,
            gridAutoFlow: "column"
        }}>
            {Array.from({ length: ((hours.length * 4) + 1) * (stages.length + 1) }, (_, i) => (
                <div
                    key={i}
                    className="grid-item bg-sky-50"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            ))}
            <div className="sticky row-start-2 col-start-1 grid gap-0.5 left-0 bg-sky-50" style={{ gridRowEnd: (hours.length * 4) + 3, gridTemplateRows: `repeat(${(hours.length * 4) + 1}, 8px)` }}>
              {hours.map((hour, index) => (
                  <div style={{ gridRowStart: (index * 4) + 2, gridRowEnd: (index * 4) + 3, marginTop: "-10px" }} className="bg-sky-50" key={hour}><p className="text-center text-sm">{hour}</p></div>
              ))}
            </div>
            <div className="sticky col-start-2 flex top-0 gap-0.5" style={{ gridColumnEnd: stages.length }}>
              {stages.map((stage, index) => (
                  <div  className="bg-sky-200 flex justify-center items-center min-w-40" key={stage}>{stage}</div>
              ))}
            </div>
            {events.map((event) => {
              const stageIndex = stages.findIndex(s => s.toLowerCase() === event.stage.toLowerCase());
              const startHour = hours.findIndex(hour => hour === parseInt(event.time.split(":")[0])) * 4;
              const startMinutes = parseInt(event.time.split(":")[1]);
              const rowStart = Math.floor((startMinutes === 0 ? startHour : startHour + (startMinutes * (4 / 60))) + 3);
              const endHour = hours.findIndex(hour => hour === parseInt(event.time.split("-")[1].split(":")[0])) * 4;
              const endMinutes = parseInt(event.time.split("-")[1].split(":")[1]);
              const rowEnd = Math.floor((endMinutes === 0 ? endHour : endHour + (endMinutes * (4 / 60))) + 3);
              return (
                <div style={{ gridColumn: `${stageIndex + 2} / ${stageIndex + 3}`, gridRow: `${rowStart} / ${rowEnd}`, backgroundColor: genreColours[event.genre] }} className="flex justify-center items-center rounded-md" key={event.artist}>
                    <p style={{color: getTextColour(genreColours[event.genre])}} className="text-xs text-center">{event.artist} <br /> <span>{event.time}</span></p>
                </div>
              )
            })}
        </div>
        <Interactions genreColours={genreColours} />
    </div>
  );
}

function getTextColour(bgColour: string) {
  const isHex = /^#[0-9A-F]{6}$/i.test(bgColour);
  if (!isHex) return "#000000"; // "black
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgColour);
  const rgb = result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
  if (!rgb) return "#000000"; // "black"
  // Luminance formula from RGB. Photometric/digital ITU BT.709:
  const luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
  return luma > 165 ? "#000" : "#fff";
}