"use client";

import { axiosInstance } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Recommendations } from "@/types/resources/recommendations";
import { AxiosResponse } from "axios";

export function useGetRecommendations({ movieId }: { movieId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`recommendations-${movieId}`],
    queryFn: async () => {
      const res = (await axiosInstance.get(
        `movie/${movieId}/recommendations`,
      )) as AxiosResponse;

      return res.data as Recommendations;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}
