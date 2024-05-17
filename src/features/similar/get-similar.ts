"use client";

import { axiosInstance } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Similar } from "@/types/resources/similar";
import { AxiosResponse } from "axios";

export function useGetSimilar({ movieId }: { movieId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`similar-${movieId}`],
    queryFn: async () => {
      const res = (await axiosInstance.get(
        `/movie/${movieId}/similar`,
      )) as AxiosResponse;

      return res.data as Similar;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}
