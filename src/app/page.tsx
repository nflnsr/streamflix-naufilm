"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGetMovies } from "@/features/movies/get-movies";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";

export default function Home() {
  const page = useSearchParams().get("page") || "1";
  const { data, isLoading } = useGetMovies({ page: parseInt(page) });

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
          {data?.results?.map((film, i) => (
            <React.Fragment key={i}>
              <Link href={`/${film?.id}`}>
                <div className=" group relative">
                  <div className="font-gray-100 absolute bottom-3 left-1/2 z-10 w-full -translate-x-1/2 bg-stone-800 font-medium">
                    <p className="line-clamp-1 w-full text-wrap px-2.5 py-0.5 group-hover:text-red-700">
                      {film?.title}
                    </p>
                  </div>
                  <div className="absolute z-10 bg-black px-1">
                    <p className="">⭐{film?.vote_average.toFixed(2)}</p>
                  </div>
                  <div className="relative h-[350px] w-60 overflow-hidden">
                    <Image
                      src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${film?.poster_path}`}
                      alt=""
                      fill
                      sizes="100%"
                      priority
                      className="rounded-md duration-300 hover:scale-110 hover:brightness-125"
                    />
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
