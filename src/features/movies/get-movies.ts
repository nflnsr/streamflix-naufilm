"use client";

import { axiosInstance } from "@/config/axios";
import { Movies } from "@/types/resources/movies";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useGetMovies({ page = 1 }: { page?: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`movies-${page}`],
    queryFn: async () => {
      const res = (await axiosInstance.get(
        `/movie/now_playing?language=en-US&region=ID&page=${page}`
      )) as AxiosResponse;

      return res.data as Movies;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}
