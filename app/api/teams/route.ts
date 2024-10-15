import { getTeamNames } from "@/lib/getTeamNames";

export async function GET() {
  const teamNames = await getTeamNames();

  return Response.json({
    data: teamNames,
  });
}
