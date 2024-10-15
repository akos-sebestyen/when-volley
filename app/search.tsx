"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useParams, useRouter } from "next/navigation";
import { b64EncodeUnicode } from "@/lib/b64";
import { decodeTeamName } from "@/lib/decodeTeamName";
import { useTeamsQuery } from "@/lib/queries/useTeamsQuery";

export default function Search() {
  const router = useRouter();
  const { id: teamId } = useParams<{ id: string }>();

  const [searchTerm, setSearchTerm] = useState(
    teamId ? decodeTeamName(teamId) : "",
  );

  const [filteredTeams, setFilteredTeams] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data: { teamNames } = {} } = useTeamsQuery();

  // Filter team names based on the search term
  useEffect(() => {
    if (searchTerm && teamNames) {
      const results = teamNames.filter((team) =>
        team.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredTeams(results);
    } else {
      setFilteredTeams([]);
    }
  }, [searchTerm, teamNames]);

  return (
    <div className="flex flex-col items-center justify-center mt-[10vh]">
      <a href="/">
        <h1 className="text-5xl font-bold">when volley??</h1>
      </a>
      <div className="flex">
        <Command>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <form
              className="flex flex-row gap-2 m-6"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/teams/${b64EncodeUnicode(searchTerm)}`);
              }}
            >
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
              <Button type="submit">Search</Button>
            </form>
          </Popover>
        </Command>
      </div>
    </div>
  );
}
