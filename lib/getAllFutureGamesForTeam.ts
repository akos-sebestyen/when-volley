import { parse, isAfter, set } from "date-fns";
import { Game, Schedule } from "./Schedule.types";

type FutureGameInfo = {
  game: Game;
  date: Date;
};

export function getAllFutureGamesForTeam(
  schedule: Schedule,
  teamName: string,
): FutureGameInfo[] {
  const now = new Date();
  const dateFormat = "EEE MMM dd, yyyy"; // Date format in the schedule

  const futureGames: FutureGameInfo[] = [];

  schedule.forEach((daySchedule) => {
    // Parse the date string using the format
    const gameDate = parse(daySchedule.date, dateFormat, new Date());

    daySchedule.games.forEach((game) => {
      // Check if the team is involved in the game
      if (game.team1 === teamName || game.team2 === teamName) {
        let timeString = game.time.trim().toUpperCase();

        // If the time is "FINAL", the game is over
        if (timeString === "FINAL") {
          return; // Skip this game
        }

        // Remove potential time zone abbreviation at the end (e.g., "PST")
        timeString = timeString.replace(/\b[A-Z]{2,4}\b$/, "").trim(); // Removes "PST", "EST", etc.

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
          futureGames.push({ game, date: gameDateTime });
        }
      }
    });
  });

  return futureGames;
}
