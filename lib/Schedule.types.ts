// schedule object
/**
 * [
 * {
 *  date: "Wed Oct 16, 2024",
 *  games: [
 *    {
 *      team1: "team1",
 *      team2: "team2",
 *      time: "8:00 PM PST",
 *      location: "location",
 *      locationLink: "locationLink"
 *    }
 *  ]
 * }
 * ]
 */

export type Game = {
  team1: string;
  team2: string;
  time: string;
  location: string;
  locationLink?: string;
};
export type DaySchedule = {
  date: string;
  games: Game[];
};
export type Schedule = DaySchedule[];
