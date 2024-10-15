"use client";
// pages/index.js

import React, { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useDebounce } from "../lib/useDebounce";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { b64DecodeUnicode, b64EncodeUnicode } from "@/lib/b64";
import { decodeTeamName } from "@/lib/decodeTeamName";

export default function Search() {
  const router = useRouter();
  const { id: teamId } = useParams<{ id: string }>();

  const [searchTerm, setSearchTerm] = useState(
    teamId ? decodeTeamName(teamId) : "",
  );
  const [teamNames, setTeamNames] = useState<string[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch team names when the component mounts
  React.useEffect(() => {
    async function fetchTeamNames() {
      try {
        const response = await fetch("/api/teams");
        const { data } = await response.json();
        setTeamNames(data);
      } catch (error) {
        console.error("Error fetching team names:", error);
      }
    }

    fetchTeamNames();
  }, []);

  // Filter team names based on the search term
  React.useEffect(() => {
    if (searchTerm) {
      const results = teamNames.filter((team) =>
        team.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredTeams(results);
    } else {
      setFilteredTeams([]);
    }
  }, [searchTerm, teamNames]);

  return (
    <div className="flex flex-col items-center justify-center mt-[10vh] bg-white">
      <h1 className="text-5xl font-bold">when volley??</h1>
      <div className="flex">
        <Command>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex flex-row gap-2 m-10">
              <PopoverAnchor asChild>
                <Input
                  type="text"
                  placeholder="Enter team name"
                  className="w-60"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                  }}
                />
              </PopoverAnchor>

              <PopoverContent
                className="p-0 w-60"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <CommandList>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <CommandItem
                        key={team}
                        onSelect={() => {
                          setSearchTerm(team);
                          setIsOpen(false);
                          // navig
                          router.push(`/teams/${b64EncodeUnicode(team)}`);
                        }}
                      >
                        {team}
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem disabled>No results found.</CommandItem>
                  )}
                </CommandList>
              </PopoverContent>
              <Button>Search</Button>
            </div>
          </Popover>
        </Command>
      </div>
    </div>
  );
}
