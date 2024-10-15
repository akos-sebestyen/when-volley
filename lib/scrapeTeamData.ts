import axios from "axios";
import { load } from "cheerio";
import NodeCache from "node-cache";
import { DaySchedule, Game, Schedule } from "@/lib/Schedule.types";

const dataCache = new NodeCache({ stdTTL: 60 * 60 });

/**
 * Fetches and parses team names from the specified volleyball schedule website.
 *
 * @returns {Promise<string[]>} An array of unique team names.
 */
export async function scrapeTeamData(): Promise<{
  teamNames?: string[];
  schedule?: Schedule;
}> {
  try {
    if (dataCache.has("teamNames") && dataCache.has("schedule")) {
      return {
        teamNames: dataCache.get("teamNames"),
        schedule: dataCache.get("schedule"),
      };
    }

    // Fetch the HTML content from the website
    const { data } = await axios.get(
      "https://www.nofrillsvolleyball.com/leagues/schedules.cfm?clientid=2768&leagueid=6972",
    );

    // Load the HTML into Cheerio
    const $ = load(data);

    // Initialize a Set to hold unique team names
    const teamNames = new Set<string>();

    const schedule: Schedule = [];

    const tables = $("table.table-hover.w-100");

    const dates = $(".h5heading.my-2");

    tables.each((tableIndex, tableElement) => {
      // find nearest element with class h5heading my-2
      const dateElement = $(dates[tableIndex]);

      const date = dateElement.text().trim();

      const tableRows = $(tableElement).find("table tr");

      const daySchedule: DaySchedule = {
        date,
        games: [],
      };

      schedule.push(daySchedule);

      // Select the table rows containing the team names
      tableRows.each((index, element) => {
        // Skip the header row
        if (index === 0) return;

        // Extract team names from the specific table cells
        const team1 = $(element)
          .find("td:nth-child(3)")
          .find(".d-sm-inline")
          .text()
          .trim();

        const team2 = $(element)
          .find("td:nth-child(5)")
          .find(".d-sm-inline")
          .text()
          .trim();

        const time = $(element).find("td:nth-child(1)").text().trim();

        const location = $(element).find("td:nth-child(7)").text().trim();
        const locationLink = $(element).find("td:nth-child(8) a").attr("href");

        const game: Game = {
          team1,
          team2,
          time,
          location,
          locationLink,
        };

        daySchedule.games.push(game);
        // Add team names to the Set to avoid duplicates
        if (team1) teamNames.add(team1);
      });
    });

    dataCache.set("teamNames", Array.from(teamNames));
    dataCache.set("schedule", schedule);

    // Convert the Set to an Array and return
    return { teamNames: Array.from(teamNames), schedule };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "An error occurred while fetching team names:",
        error.message,
      );
    } else {
      console.error("An unknown error occurred.", error);
    }
    return {};
  }
}
