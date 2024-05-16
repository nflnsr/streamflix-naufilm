"use client";

import { axiosInstance } from "@/config/axios";
import { Credits } from "@/types/resources/credits";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useGetCredits({ movieId }: { movieId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`credits-${movieId}`],
    queryFn: async () => {
      const res = (await axiosInstance.get(`/movie/${movieId}/credits`)) as AxiosResponse;

      return res.data as Credits;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}
