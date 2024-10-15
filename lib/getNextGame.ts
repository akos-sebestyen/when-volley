import { compareAsc, isAfter, parse, set } from "date-fns";
import { NextGameInfo, Schedule } from "./Schedule.types";

export function getNextClosestGame(
  schedule: Schedule,
  teamName?: string,
): NextGameInfo {
  const now = new Date();
  const dateFormat = "EEE MMM dd, yyyy"; // Date format in the schedule

  let nextGameInfo: NextGameInfo = null;
  let closestDate: Date | null = null;

  schedule.forEach((daySchedule) => {
    // Parse the date string using the format
    const gameDate = parse(daySchedule.date, dateFormat, new Date());

    daySchedule.games.forEach((game) => {
      // If a teamName is provided, check if the team is involved in the game
      if (teamName && game.team1 !== teamName && game.team2 !== teamName) {
        return; // Skip this game if the team is not involved
      }

      let timeString = game.time.trim().toUpperCase();

      // If the time is "FINAL", the game is over
      if (timeString === "FINAL") {
        return; // Skip this game
      }

      // Remove only the time zone abbreviation (e.g., "PST", "EST", etc.) but leave "AM/PM"
      timeString = timeString.replace("/s(PST|PDT)$/", ""); // Removes "PST", "EST", etc., if present

      // Now split the time to handle AM/PM and hour parsing
      const timeWithoutZone = timeString.split(" ")[0]; // e.g., "8:00"
      const period = timeString.includes("PM") ? "PM" : "AM"; // Determine AM/PM

      // Split hours and minutes
      // eslint-disable-next-line prefer-const
      let [hours, minutes] = timeWithoutZone.split(":").map(Number);

      // Handle AM/PM for hours
      if (period === "PM" && hours < 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0; // Handle midnight (12 AM)
      }

      // Set the time on gameDate
      const gameDateTime = set(gameDate, {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
      });

      // Check if the game is in the future
      if (isAfter(gameDateTime, now)) {
        if (closestDate === null || compareAsc(gameDateTime, closestDate) < 0) {
          closestDate = gameDateTime;
          nextGameInfo = { game, date: gameDateTime };
        }
      }
    });
  });

  return nextGameInfo;
}
