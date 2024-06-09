import React from 'react';
import { NavBar } from '@/components/nav';
import fs from "fs";
import { z } from "zod";

const literal = z.custom<`${number}:${number}-${number}:${number}`>((val) =>
  /^\d+:\d+-\d+:\d+$/.test(val as string), {message: "Invalid time format. Should look like this: '12:00-13:00'"}
);

type Event = {
  day: string,
  time: typeof literal._type,
  stage: string,
  artist: string;
  genre: string;
}

type GenreColours = Record<string, string>

type Lineup = {
  dayStartAt: `${number}:${number}`;
  dayEndAt: `${number}:${number}`;
  days: string[];
  stages: string[];
  events: Event[];
  genreColours: GenreColours;
}




export default async function Day({ params }: { params: { slug: string } }) {
  const lineup = await fs.promises.readFile("./glastonbury2024.csv", "utf-8");
  const config = await fs.promises.readFile("./config.json", "utf-8");
  const parsedData = lineup.split("\n").slice(1);
  const allEvents: Event[] = [];
  for (const line of parsedData) {
    if (!line) continue;
    const [artist, day, time, stage, genre] = line.split(",");
    const is = /^\d+:\d+-\d+:\d+$/.test(time);
    if (!is) console.log(`FAIL: ${line}`);
    else console.log(`PASS: ${line}`);
    allEvents.push({ day, time: literal.parse(time), stage, artist, genre: genre.trim() });
  }
  const { dayStartAt, dayEndAt, stages, genreColours } = JSON.parse(config) as Lineup;
  const events = allEvents.filter((event) => event.day?.toLowerCase() === params.slug?.toLowerCase());
  const hourStart = parseInt(dayStartAt.split(":")[0]);
  const hourEnd = parseInt(dayEndAt.split(":")[0]);
  const hours = hourEnd < hourStart ? Array.from({ length: 24 - hourStart + hourEnd + 1 }, (_, i) => (hourStart + i) % 24) : Array.from({ length: hourEnd - hourStart + 1 }, (_, i) => hourStart + i);

  return (
    <div className="flex flex-col w-fit">
        <NavBar />
        <div className="w-fit gap-0.5" style={{
            display: "grid",
            gridTemplateColumns: ` 50px repeat(${stages.length}, 250px)`,
            gridTemplateRows: `50px repeat(${(hours.length * 4) + 1}, 12px)`,
            gridAutoFlow: "column"
        }}>
            {Array.from({ length: ((hours.length * 4) + 1) * (stages.length + 1) }, (_, i) => (
                <div
                    key={i}
                    className="grid-item bg-indigo-50"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            ))}
            {hours.map((hour, index) => (
                <div style={{ gridRowStart: (index * 4) + 2, gridRowEnd: (index * 4) + 3, gridColumnStart: 1, gridColumnEnd: 2, marginTop: "-13px" }} className="bg-indigo-50" key={hour}><p>{hour}</p></div>
            ))}
            {stages.map((stage, index) => (
                <div style={{ gridColumnStart: index + 2, gridColumnEnd: index + 3, gridRowStart: 1, gridRowEnd: 2 }} className="bg-indigo-200 flex justify-center items-center" key={stage}>{stage}</div>
            ))}
            {events.map((event) => {
              const stageIndex = stages.findIndex(s => s.toLowerCase() === event.stage.toLowerCase());
              const startHour = hours.findIndex(hour => hour === parseInt(event.time.split(":")[0])) * 4;
              const startMinutes = parseInt(event.time.split(":")[1]);
              const rowStart = Math.floor((startMinutes === 0 ? startHour : startHour + (startMinutes * (4 / 60))) + 2);
              const endHour = hours.findIndex(hour => hour === parseInt(event.time.split("-")[1].split(":")[0])) * 4;
              const endMinutes = parseInt(event.time.split("-")[1].split(":")[1]);
              const rowEnd = Math.floor((endMinutes === 0 ? endHour : endHour + (endMinutes * (4 / 60))) + 2);
              return (
                <div style={{ gridColumn: `${stageIndex + 2} / ${stageIndex + 3}`, gridRow: `${rowStart} / ${rowEnd}`, backgroundColor: genreColours[event.genre] }} className="flex justify-center items-center rounded-md" key={event.artist}>
                    <p className="text-sm text-center">{event.artist} <br /> <span>{event.time}</span></p>
                </div>
              )
            })}
        </div>
    </div>
  );
}