import { useQuery } from "@tanstack/react-query";
import type { UserProfileStats } from "@/interfaces/api";
import habitsApi from "@/api/habitsApi";

const getProfileStats = (): Promise<UserProfileStats> =>
  habitsApi.get("/stats/profile").then((res) => res.data);

export function useProfileStats() {
  return useQuery<UserProfileStats>({
    queryKey: ["profile-stats"],
    queryFn: getProfileStats,
    staleTime: 0, // siempre fresco — cambia al completar hábitos
    refetchOnWindowFocus: false,
  });
}
