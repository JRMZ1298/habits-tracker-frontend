import habitsApi from "@/api/habitsApi";
import { useQuery } from "@tanstack/react-query";

type Recommendation = {
  title: string;
  image: string;
};

export const useRecommendation = () => {
  return useQuery<Recommendation>({
    queryKey: ["recommendation"],
    queryFn: async () => {
      const { data } = await habitsApi.get<Recommendation>("/recommendation");
      return data;
    },

    // ⚡ optimización
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  });
};
