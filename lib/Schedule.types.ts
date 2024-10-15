// schedule object
/**
 * [
 * {
 *  date: "2021-09-01",
 *  games: [
 *    {
 *      team1: "team1",
 *      team2: "team2",
 *      time: "19:00",
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
