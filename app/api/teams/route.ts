import { scrapeTeamData } from "@/lib/scrapeTeamData";

export async function GET() {
  const data = await scrapeTeamData();

  return Response.json({
    data,
  });
}
