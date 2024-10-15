import { NextGameInfo } from "@/lib/Schedule.types";
import { format } from "date-fns";

export function getGoogleCalendarLink(nextGame: NextGameInfo) {
  if (!nextGame) return "#";

  // Format the date and include the Pacific timezone
  const startDate = format(nextGame.date, "yyyyMMdd'T'HHmmss"); // Removed "Z"
  const endDate = format(
    new Date(nextGame.date.getTime() + 2 * 60 * 60 * 1000), // Adds 2 hours to the game date
    "yyyyMMdd'T'HHmmss",
  ); // Removed "Z"

  const details = encodeURIComponent(
    `${nextGame.game.team1} vs ${nextGame.game.team2}`,
  );
  const location = encodeURIComponent(nextGame.game.location);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${details}&dates=${startDate}/${endDate}&location=${location}&ctz=America/Los_Angeles&sf=true&output=xml`;
}
