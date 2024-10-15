"use client";

import { useParams } from "next/navigation";
import { decodeTeamName } from "@/lib/decodeTeamName";

export default function TeamPage() {
  const { id: teamId } = useParams<{ id: string }>();

  return (
    <div className="flex mx-10">
      <h2 className="text-2xl font-bold">{decodeTeamName(teamId)}</h2>
    </div>
  );
}
