import { getTeamData } from "@/lib/getTeamData";

export async function GET() {
  const data = await getTeamData();

  return Response.json({
    data,
  });
}
