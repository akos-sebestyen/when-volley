import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-5xl font-bold mb-8">when volley??</h1>
      <div className="flex">
        <Input type="text" placeholder="Enter team name" className="mr-4" />
        <Button>Search Team</Button>
      </div>
    </div>
  );
}
