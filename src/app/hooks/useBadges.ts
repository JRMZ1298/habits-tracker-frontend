import { useQuery } from "@tanstack/react-query";
import type { Badge } from "@/interfaces/api";
import habitsApi from "@/api/habitsApi";

const getBadges = (): Promise<Badge[]> =>
  habitsApi.get("/badges/").then((res) => res.data);

const getBadgesProgress = (): Promise<Record<string, number>> =>
  habitsApi.get("/badges/progress").then((res) => res.data);

export function useBadges() {
  return useQuery<Badge[]>({
    queryKey: ["badges"],
    queryFn: getBadges,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBadgesProgress() {
  return useQuery<Record<string, number>>({
    queryKey: ["badges-progress"],
    queryFn: getBadgesProgress,
    staleTime: 1000 * 60 * 2,
  });
}
