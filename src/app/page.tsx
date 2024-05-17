"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGetMovies } from "@/features/movies/get-movies";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { priceFormatter, ratingToPrice } from "@/utils";
import { useOwnedFilmStore } from "@/store/owned-film";

export default function Home() {
  const page = useSearchParams().get("page") || "1";
  const { data, isLoading } = useGetMovies({ page: parseInt(page) });
  const { film } = useOwnedFilmStore();

  return (
    <main className="min-h-[calc(100svh-var(--footer-height))] bg-zinc-900 pb-4 text-gray-300 min-[1140px]:pt-24 2xl:px-8">
      <p className="px-2 text-center text-3xl  font-bold text-red-800 underline decoration-2">
        Sedang tayang di Indonesia!
      </p>
      {isLoading && (
        <div className="flex h-[65svh] items-center justify-center">
          <div className="h-28 w-28 animate-spin rounded-full border-b-2 border-t-2 border-white dark:border-white"></div>
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-wrap justify-center gap-4 pt-8 text-center">
          {data?.results?.map((movies, i) => (
            <React.Fragment key={i}>
              <Link href={`/${movies?.id}`}>
                <div className="group relative">
                  <div className="font-gray-100 absolute bottom-3 left-1/2 z-10 w-full -translate-x-1/2 bg-stone-800 font-medium">
                    <p className="line-clamp-1 w-full text-wrap px-2.5 py-0.5 group-hover:text-red-700">
                      {movies?.title}
                    </p>
                  </div>
                  <div className="absolute z-10 bg-black px-1">
                    <p className="">⭐{movies?.vote_average.toFixed(2)}</p>
                  </div>
                  {!film?.includes(movies?.id as number) && (
                    <div className="absolute right-0 z-10 bg-red-800 px-1 py-1">
                      <p className="text-sm text-gray-200">
                        Rp{" "}
                        {priceFormatter(
                          Number(ratingToPrice(movies?.vote_average)),
                        )}
                      </p>
                    </div>
                  )}
                  <div className="relative h-[350px] w-60 overflow-hidden">
                    <Image
                      src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movies?.poster_path}`}
                      alt=""
                      fill
                      sizes="100%"
                      priority
                      className="rounded-md duration-300 hover:scale-110 hover:brightness-125"
                    />
                    {film?.includes(movies?.id as number) && (
                      <div className="absolute -right-8 top-32 -translate-x-1/2 rotate-45 bg-green-800">
                        <p className="absolute right-0 z-30 w-56 bg-green-800 text-center font-mono text-3xl font-semibold uppercase tracking-widest text-white">
                          owned
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="py-6">
        <Pagination
          pageNow={Number(page)}
          totalPages={data?.total_pages as number}
        />
      </div>
    </main>
  );
}
