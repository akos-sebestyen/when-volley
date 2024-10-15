"use client";

import { useParams } from "next/navigation";
import { decodeTeamName } from "@/lib/decodeTeamName";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Importing Tooltip from Shadcn
import { getNextClosestGame } from "@/lib/getNextGame";
import { useTeamsQuery } from "@/lib/queries/useTeamsQuery";
import { getAllFutureGamesForTeam } from "@/lib/getAllFutureGamesForTeam";
import { format } from "date-fns";
import { CalendarPlus, MapPin } from "lucide-react"; // Importing the CalendarPlus icon from lucide-react
import NPCDialogue from "@/app/teams/[id]/NPCDialogue";
import { TeamPageSkeletonLoader } from "@/app/teams/[id]/TeamPageSkeletonLoader";
import { getGoogleCalendarLink } from "@/lib/getGoogleCalendarLink";

export default function TeamPage() {
  const { id: teamId } = useParams<{ id: string }>();

  // Using React Query to fetch the teams and schedule
  const { data: { schedule } = {}, isLoading } = useTeamsQuery();

  const teamName = decodeTeamName(teamId);

  // If React Query is still loading, show skeletons
  if (isLoading) {
    return (
      <div className="flex flex-col mx-10 gap-8 items-center">
        <TeamPageSkeletonLoader />
      </div>
    );
  }

  const nextGame = getNextClosestGame(schedule ?? [], teamName);
  const futureGameInfos = getAllFutureGamesForTeam(schedule ?? [], teamName);

  return (
    <div className="flex flex-col mx-10 gap-8 items-center">
      <h2 className="text-2xl font-bold">{decodeTeamName(teamId)}</h2>

      {/* Card Container with max-width */}
      <div className="flex flex-col gap-5 w-full max-w-2xl">
        {/* Next Game Section */}
        <Card className="relative">
          <CardHeader>
            <CardTitle>
              {nextGame
                ? format(nextGame.date, "EEEE, MMMM d, yyyy 'at' h:mm a")
                : "No upcoming game"}
            </CardTitle>
          </CardHeader>
          {nextGame ? (
            <CardContent>
              <div className="text-lg font-semibold">
                {nextGame.game.team1} vs {nextGame.game.team2}
              </div>
              <div className="text-sm text-gray-600">
                Location: {nextGame.game.location}
              </div>
              {nextGame.game.locationLink && (
                <a
                  href={nextGame.game.locationLink}
                  target="_blank"
                  className="inline-flex items-center text-blue-600 underline"
                >
                  <MapPin className="mr-2 h-5 w-5" /> View on Google Maps
                </a>
              )}
            </CardContent>
          ) : (
            <CardContent>No upcoming game found</CardContent>
          )}
          <CardFooter>
            <p>Stay tuned for the next match!</p>
          </CardFooter>

          {/* Add to GCal Icon with Tooltip */}
          {nextGame && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={getGoogleCalendarLink(nextGame)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 text-blue-500 hover:text-blue-700"
                >
                  <CalendarPlus className="h-6 w-6" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Google Calendar</p>
              </TooltipContent>
            </Tooltip>
          )}
        </Card>

        {/* Future Games Section */}
        <Card>
          <CardHeader>
            <CardTitle>Future Games</CardTitle>
          </CardHeader>
          <CardContent>
            {futureGameInfos.length > 0 ? (
              <ul className="list-disc ml-5 space-y-3">
                {futureGameInfos.map((gameInfo, index) => (
                  <li key={index}>
                    <div className="font-semibold">
                      {gameInfo.game.team1} vs {gameInfo.game.team2}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(gameInfo.date, "EEEE, MMMM d, yyyy 'at' h:mm a")}
                    </div>
                    <div className="text-sm text-gray-600">
                      Location: {gameInfo.game.location}
                    </div>
                    {gameInfo.game.locationLink && (
                      <a
                        href={gameInfo.game.locationLink}
                        target="_blank"
                        className="inline-flex items-center text-blue-600 underline"
                      >
                        <MapPin className="mr-2 h-5 w-5" /> View on Google Maps
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No future games found for {teamName}</p>
            )}
          </CardContent>
        </Card>
        <NPCDialogue />
      </div>
    </div>
  );
}
