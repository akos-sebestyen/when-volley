"use client";

import { useParams } from "next/navigation";
import { decodeTeamName } from "@/lib/decodeTeamName";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TeamPage() {
  const { id: teamId } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col mx-10 gap-6">
      <h2 className="text-2xl font-bold">{decodeTeamName(teamId)}</h2>
      <Card>
        <CardHeader>
          <CardTitle>Next Game</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
