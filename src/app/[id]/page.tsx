"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useBalanceStore } from "@/store/balance";
import { useGetCredits } from "@/features/credits/get-credit";
import { useGetMovie } from "@/features/movie/get-movie";
import { useOwnedFilmStore } from "@/store/owned-film";
import { priceFormatter, ratingToPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useGetRecommendations } from "@/features/recommended/get-recommendations";
import { useGetSimilar } from "@/features/similar/get-similar";
import Link from "next/link";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data: movie, isLoading: loadingMovie } = useGetMovie({ movieId: id });
  const { data: credits, isLoading: loadingCredits } = useGetCredits({
    movieId: id,
  });
  const { data: recommendations, isLoading: loadingRecommendations } =
    useGetRecommendations({ movieId: id });
  const { data: similar, isLoading: loadingSimilar } = useGetSimilar({
    movieId: id,
  });

  const { film, setFilm } = useOwnedFilmStore();
  const { balance, setBalance } = useBalanceStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-900 pb-8 text-gray-300 min-[1140px]:pt-24 2xl:px-8">
      <Dialog open={isDialogOpen}>
        <DialogContent className="border-red-500 bg-zinc-800 text-gray-200">
          <DialogHeader>
            <DialogTitle className="text-red-500">
              Saldo tidak cukup!
            </DialogTitle>
            <DialogDescription className="text-zinc-300">
              Jumlah saldo yang Anda miliki tidak cukup untuk membeli film ini.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-end pt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-center font-mono text-4xl font-bold text-red-800 underline">
        OVERVIEW
      </h1>
      {loadingMovie && loadingSimilar && loadingRecommendations && (
        <div className="flex h-[60svh] items-center justify-center">
          <div className="h-28 w-28 animate-spin rounded-full border-b-2 border-t-2 border-white dark:border-white"></div>
        </div>
      )}
      {!loadingMovie && !loadingSimilar && !loadingRecommendations && (
        <div className="flex justify-between gap-2 pt-2 min-[1140px]:pr-0">
          <div className="max-w-40">
            <h1 className="text-center font-serif text-lg font-medium">
              Similar
            </h1>
            <div className="flex flex-wrap justify-center gap-4 pt-2 text-center">
              {similar?.results?.map((movie, i) => {
                if(i < 4)
                return (<React.Fragment key={i}>
                  <Link href={`/${movie?.id}`}>
                    <div className="group relative">
                      <div className="font-gray-100 absolute bottom-3 left-1/2 z-10 w-full -translate-x-1/2 bg-stone-800 font-medium">
                        <p className="line-clamp-1 w-full px-0.5 py-0.5 text-xs group-hover:text-red-700">
                          {movie?.title}
                        </p>
                      </div>
                      <div className="absolute z-10 bg-black px-1">
                        <p className="">⭐{movie?.vote_average.toFixed(2)}</p>
                      </div>
                      {/* {!film?.includes(movie?.id as number) && (
                        <div className="absolute right-0 z-10 bg-red-800 px-1 py-1">
                          <p className="text-sm text-gray-200">
                            Rp{" "}
                            {priceFormatter(
                              Number(ratingToPrice(movie?.vote_average)),
                            )}
                          </p>
                        </div>
                      )} */}
                      <div className="relative h-[150px] w-28 overflow-hidden">
                        <Image
                          src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie?.poster_path}`}
                          alt=""
                          fill
                          sizes="100%"
                          priority
                          className="rounded-md duration-300 hover:scale-110 hover:brightness-125"
                        />
                        {film?.includes(movie?.id as number) && (
                          <div className="absolute -right-8 top-32 -translate-x-1/2 rotate-45 bg-green-800">
                            <p className="absolute right-0 z-30 w-56 bg-green-800 text-center font-mono text-3xl font-semibold uppercase tracking-widest text-white">
                              owned
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </React.Fragment>);
})}
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <div className="">
              <div className="relative h-[500px] w-[350px] overflow-hidden">
                <Image
                  src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`}
                  alt={movie?.title as string}
                  fill
                  sizes="100%"
                  priority
                  // loader={({ src, width }) => {
                  //   return src + "?w=" + width;
                  // }}
                />
                {film.includes(movie?.id as number) && (
                  <div className="absolute -right-8 top-32 -translate-x-1/2 rotate-45 bg-green-800">
                    <p className="absolute right-0 z-30 w-56 bg-green-800 text-center font-mono text-3xl font-semibold uppercase tracking-widest text-white">
                      owned
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full pt-5">
                {/* <Button
                className="w-full bg-red-700 hover:bg-red-600"
                // onClick={() => setFilm(movie?.id as number)}
              > */}
                <AlertDialog>
                  <AlertDialogTrigger
                    disabled={film.includes(movie?.id as number)}
                    className={`w-full rounded-sm py-1.5 text-white ${film.includes(movie?.id as number) ? "bg-green-700 hover:bg-green-600" : "bg-red-700 hover:bg-red-600"} `}
                  >
                    {film.includes(movie?.id as number)
                      ? "Owned"
                      : `Buy now! (Rp ${priceFormatter(ratingToPrice(movie?.vote_average as number))}) `}
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-zinc-800 text-gray-200">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Beli Film?</AlertDialogTitle>
                      <AlertDialogDescription className="text-zinc-300">
                        Saldo Anda saat ini adalah Rp{balance} dan akan
                        dikurangi sebesar Rp
                        {ratingToPrice(movie?.vote_average as number)}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-red-800 hover:bg-red-700 hover:text-white">
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (
                            balance >
                            ratingToPrice(movie?.vote_average as number)
                          ) {
                            setFilm(movie?.id as number);
                            setBalance(
                              balance -
                                ratingToPrice(movie?.vote_average as number),
                            );
                          } else {
                            setIsDialogOpen(true);
                          }
                        }}
                        className="bg-gray-600 hover:bg-gray-500"
                      >
                        Lanjutkan
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {/* </Button> */}
              </div>
            </div>
            <div className="max-w-[550px] space-y-1">
              <p className="font-sans text-3xl font-bold">{movie?.title}</p>
              <p className="pt-4 oldstyle-nums">
                Rating : ⭐{movie?.vote_average}
              </p>
              <p>Duration : {movie?.runtime} menit</p>
              <p>Price : Rp {ratingToPrice(movie?.vote_average as number)}</p>
              <p>
                Genre :{" "}
                <span className="font-sans text-sm font-medium">
                  {movie?.genres?.map(
                    (genre: { name: string; id: number }, i: number) => {
                      if (i + 1 === movie?.genres.length) return genre?.name;
                      return genre?.name + ", ";
                    },
                  )}
                </span>
              </p>
              <p>Popularity : {movie?.popularity}</p>
              <p className="font-medium">Release : {movie?.release_date}</p>
              <p className="pt-2 font-sans text-sm font-bold text-red-700">
                IMDB ID : {movie?.imdb_id}
              </p>
              <p className="font-sans text-sm font-bold text-red-700">
                Tagline : {movie?.tagline ? movie?.tagline : "-"}
              </p>
              <p className="pt-5 font-bold underline">Synopsys</p>
              <p className="text-justify">{movie?.overview}</p>
            </div>
          </div>
          <div className="max-w-40">
            <h1 className="text-center font-serif text-lg font-medium">
              Rekomendasi
            </h1>
            <div className="flex flex-wrap justify-center gap-4 pt-2 text-center">
              {recommendations?.results?.map((movie, i) => {
                if(i < 4)
                  return (<React.Fragment key={i}>
                  <Link href={`/${movie?.id}`}>
                    <div className="group relative">
                      <div className="font-gray-100 absolute bottom-3 left-1/2 z-10 w-full -translate-x-1/2 bg-stone-800 font-medium">
                        <p className="line-clamp-1 w-full px-0.5 py-0.5 text-xs group-hover:text-red-700">
                          {movie?.title}
                        </p>
                      </div>
                      <div className="absolute z-10 bg-black px-1">
                        <p className="">⭐{movie?.vote_average.toFixed(2)}</p>
                      </div>
                      {/* {!film?.includes(movie?.id as number) && (
                        <div className="absolute right-0 z-10 bg-red-800 px-1 py-1">
                          <p className="text-sm text-gray-200">
                            Rp{" "}
                            {priceFormatter(
                              Number(ratingToPrice(movie?.vote_average)),
                            )}
                          </p>
                        </div>
                      )} */}
                      <div className="relative h-[150px] w-28 overflow-hidden">
                        <Image
                          src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie?.poster_path}`}
                          alt=""
                          fill
                          sizes="100%"
                          priority
                          className="rounded-md duration-300 hover:scale-110 hover:brightness-125"
                        />
                        {film?.includes(movie?.id as number) && (
                          <div className="absolute -right-8 top-32 -translate-x-1/2 rotate-45 bg-green-800">
                            <p className="absolute right-0 z-30 w-56 bg-green-800 text-center font-mono text-3xl font-semibold uppercase tracking-widest text-white">
                              owned
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </React.Fragment>);
              })}
            </div>
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
      <div className="px-2 pt-12">
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
                      alt={cast?.name}
                      fill
                      sizes="100%"
                      className="rounded-t-md bg-[url('/assets/images.png')] bg-contain text-xs text-black"
                      // priority
                      loading="lazy"
                    />
                  </div>
                  <div className="grid h-10 place-items-center">
                    <p className="line-clamp-2 px-1.5 text-center text-xs">
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
