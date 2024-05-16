"use client";

import { axiosInstance } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types/resources/movie";
import { AxiosResponse } from "axios";

export function useGetMovie({ movieId }: { movieId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`movie-${movieId}`],
    queryFn: async () => {
      const res = (await axiosInstance.get(`/movie/${movieId}`)) as AxiosResponse;

      return res.data as Movie;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}
