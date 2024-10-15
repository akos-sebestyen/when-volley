// utils/getTeamNames.js

import axios from "axios";
import { load } from "cheerio";
import NodeCache from "node-cache";

const teamCache = new NodeCache({ stdTTL: 60 * 60 });

/**
 * Fetches and parses team names from the specified volleyball schedule website.
 *
 * @returns {Promise<string[]>} An array of unique team names.
 */
export async function getTeamNames() {
  try {
    if (teamCache.has("teamNames")) {
      return teamCache.get("teamNames");
    }

    // Fetch the HTML content from the website
    const { data } = await axios.get(
      "https://www.nofrillsvolleyball.com/leagues/schedules.cfm?clientid=2768&leagueid=6972",
    );

    // Load the HTML into Cheerio
    const $ = load(data);

    // Initialize a Set to hold unique team names
    const teamNames = new Set();

    const tableRows = $("table tr");

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
      // const team2 = $(element).find("td:nth-child(5)").text().trim();

      // Add team names to the Set to avoid duplicates
      if (team1) teamNames.add(team1);
    });

    teamCache.set("teamNames", Array.from(teamNames));

    // Convert the Set to an Array and return
    return Array.from(teamNames);
  } catch (error) {
    console.error(
      "An error occurred while fetching team names:",
      error.message,
    );
    return [];
  }
}
