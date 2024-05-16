"use client";

import { useGetCredits } from "@/features/credits/get-credit";
import { useGetMovie } from "@/features/movie/get-movie";
import { priceFormatter } from "@/utils";
import Image from "next/image";
import React from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data: movie, isLoading: loadingMovie } = useGetMovie({ movieId: id });
  const { data: credits, isLoading: loadingCredits } = useGetCredits({
    movieId: id,
  });

  return (
    <main className="min-h-screen bg-zinc-900 pb-8 text-gray-300 min-[1140px]:pt-28 2xl:px-8">
      <h1 className="text-center font-mono text-4xl font-bold text-red-800 underline">
        OVERVIEW
      </h1>
      {loadingMovie && (
        <div className="flex h-[60svh] items-center justify-center">
          <div className="h-28 w-28 animate-spin rounded-full border-b-2 border-t-2 border-white dark:border-white"></div>
        </div>
      )}
      {!loadingMovie && (
        <div className="flex justify-center gap-16 pt-8 min-[1140px]:pr-16">
          <div className="relative h-[500px] w-[350px]">
            <Image
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`}
              alt=""
              fill
              sizes="100%"
              priority
            />
          </div>
          <div className="max-w-[550px] space-y-1">
            <p className="font-sans text-3xl font-bold">{movie?.title}</p>
            <p className="pt-4 oldstyle-nums">
              Rating : ⭐{movie?.vote_average}
            </p>
            <p>Duration : {movie?.runtime} menit</p>
            <p>Price : Rp {priceFormatter(movie?.vote_average as number)}</p>
            <p>
              Genre :{" "}
              {movie?.genres?.map(
                (genre: { name: string; id: number }, i: number) => {
                  if (i + 1 === movie?.genres.length) return genre?.name;
                  return genre?.name + ", ";
                },
              )}
            </p>
            <p>Popularity : {movie?.popularity}</p>
            <p>Release : {movie?.release_date}</p>
            <p className="">IMDB ID : {movie?.imdb_id}</p>
            <p className="">Tagline : {movie?.tagline}</p>
            <p className="pt-5 font-bold underline">Synopsys</p>
            <p className="text-justify">{movie?.overview}</p>
          </div>
        </div>
      )}
      {/* <div className="max-w-96 w-60 h-[350px] relative">
        <Image
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie?.backdrop_path}`}
          alt=""
          fill
          sizes="100%"
          priority
        />
      </div> */}
      <div className="px-20 pt-12">
        <h1 className="text-center font-mono text-3xl font-bold">
          Cast Member
        </h1>
        {loadingCredits && (
          <div className="flex h-[45svh] items-center justify-center">
            <div className="h-28 w-28 animate-spin rounded-full border-b-2 border-t-2 border-white dark:border-white"></div>
          </div>
        )}
        {!loadingCredits && (
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {credits?.cast?.map((cast, i: number) => (
              <React.Fragment key={i}>
                <div className="w-[110px] text-wrap rounded-md bg-red-900 text-zinc-200">
                  <div className="relative h-[125px] w-[110px]">
                    <Image
                      src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${cast?.profile_path}`}
                      alt=""
                      fill
                      sizes="100%"
                      className="rounded-t-md"
                      // priority
                    />
                  </div>
                  <div className="grid h-10 place-items-center">
                    <p className="line-clamp-2 text-wrap px-1.5 py-1 text-center text-xs">
                      {cast?.original_name}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
