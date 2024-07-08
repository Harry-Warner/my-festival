import { z } from "zod";

export const literal = z.custom<`${number}:${number}-${number}:${number}`>((val) =>
    /^\d+:\d+-\d+:\d+$/.test(val as string), {message: "Invalid time format. Should look like this: '12:00-13:00'"}
  );
  
  export type Event = {
    day: string,
    time: typeof literal._type,
    stage: string,
    artist: string;
    genre: string;
  }
  
  export type GenreColours = Record<string, string>
  
  export type Lineup = {
    dayStartAt: `${number}:${number}`;
    dayEndAt: `${number}:${number}`;
    days: string[];
    stages: Record<string, string[]>;
    events: Event[];
    genreColours: GenreColours;
  }