import { useQuery } from "@tanstack/react-query";
import { Schedule } from "@/lib/Schedule.types";

export const useTeamsQuery = () => {
  return useQuery<{ teamNames: string[]; schedule: Schedule }>({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await fetch("/api/teams");
      const { data } = await response.json();

      return data;
    },
    staleTime: 1000 * 60 * 60,
  });
};
