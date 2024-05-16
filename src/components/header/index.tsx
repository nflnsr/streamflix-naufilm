"use client";

import React from "react";
import Link from "next/link";
import { formatNumberWithDots } from "@/utils";
import { useBalanceStore } from "@/store/balance";
import { Button } from "../ui/button";
import { Drawer } from "../drawer";
import { RiMoonClearLine } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import { PiMoneyWavyLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useHeaderVisibilityOnScroll } from "@/hooks/useHeaderVisibilityOnScroll";

function Header() {
  const userBalance = useBalanceStore((state) => state.balance);
  const seriesList = [
    {
      link: "",
      text: "Terbaru",
    },
    {
      link: "",
      text: "Tamat",
    },
    {
      link: "",
      text: "Ongoing",
    },
    {
      link: "",
      text: "Asian",
    },
    {
      link: "",
      text: "Barat",
    },
  ];
  const genreList = [
    {
      link: "",
      text: "Action",
    },
    {
      link: "",
      text: "Adventure",
    },
    {
      link: "",
      text: "Comedy",
    },
    {
      link: "",
      text: "Drama",
    },
    {
      link: "",
      text: "Family",
    },
    {
      link: "",
      text: "Fantasy",
    },
    {
      link: "",
      text: "History",
    },
    {
      link: "",
      text: "Horror",
    },
    {
      link: "",
      text: "Music",
    },
    {
      link: "",
      text: "Mystery",
    },
    {
      link: "",
      text: "Romance",
    },
    {
      link: "",
      text: "Sport",
    },
    {
      link: "",
      text: "War",
    },
  ];

  const groupedGenres = [];
  for (let i = 0; i < genreList.length; i += 5) {
    groupedGenres.push(genreList.slice(i, i + 5));
  }

  useHeaderVisibilityOnScroll("header");

  return (
    <header
      id="header"
      className="fixed top-0 z-20 w-full backdrop-blur-[10px] transition-all duration-700"
    >
      <div className="flex h-[var(--header-height)] items-center justify-between bg-red-800/90 backdrop-blur-[10px]">
        <div className="flex w-full items-center justify-between pl-8 pr-3 xl:pl-20">
          <div>
            <Link href="/">
              <h1 className="cursor-pointer select-none text-xl font-bold text-amber-100">
                StreamFlix-NauFilm
                <BiMoviePlay className="inline size-7 pb-0.5" />
              </h1>
            </Link>
          </div>
          <ul className="flex items-center justify-center gap-2 max-[1140px]:hidden min-[1080px]:gap-3">
            <li className="text-yellow-50 hover:underline">
              <Link href="">Daftar Film</Link>
            </li>
            <li className="text-yellow-50 hover:underline">
              <Link href="">Populer</Link>
            </li>
            <li className="text-yellow-50 hover:underline">
              <Link href="">Upcoming</Link>
            </li>
            <li className="text-yellow-50 hover:underline">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-red-900 text-yellow-50 underline hover:no-underline">
                      Series
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-0.5 rounded-md border-2 border-amber-100 bg-stone-900 px-5 py-2">
                      {seriesList.map((series) => (
                        <Link
                          key={series.text}
                          href={series.link}
                          className="w-fit text-amber-50 hover:underline"
                        >
                          {series.text}
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-red-900 text-yellow-50 underline hover:no-underline">
                      Genre
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex gap-3.5 rounded-md border-2 border-amber-100 bg-stone-900 px-5 py-2">
                      {/* {genreList.map((genre, i) => {
                        return (
                          <div key={genre.text}>
                            {i % 5 === 0 ? (
                              <div>
                                <Link
                                  href={genre.link}
                                  className="hover:underline text-amber-50 w-fit"
                                >
                                  {genre.text}
                                </Link>
                              </div>
                            ) : (
                              <Link
                                href={genre.link}
                                className="hover:underline text-amber-50 w-fit"
                              >
                                {genre.text}
                              </Link>
                            )}
                          </div>
                        );
                      })} */}
                      {groupedGenres.map((group, i) => (
                        <div
                          key={`group-${i}`}
                          className="flex flex-col gap-0.5"
                        >
                          {group.map((genre) => (
                            <Link
                              key={genre.text}
                              href={genre.link}
                              className="w-fit text-amber-50 hover:underline"
                            >
                              {genre.text}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
          </ul>
          <div className="hidden items-center md:flex">
            {/* <Button className="px-5 bg-amber-400 hover:bg-amber-300 text-black hover:underline">
            Masuk
          </Button>
          <p className="text-white px-0.5">&nbsp;or</p>
          <p className="underline text-blue-300 hover:text-blue-400 hover:no-underline px-1.5">
            Register
          </p> */}
            <div className="flex items-center justify-center gap-3 ">
              {/* <Image src="" alt="" fill sizes=""/> */}
              <div className="flex cursor-default select-none gap-1 bg-zinc-800 px-2 py-1 text-amber-100">
                {/* <p>$ &nbsp;</p> */}
                <PiMoneyWavyLight className="size-6 text-green-500" />
                <p>Rp {formatNumberWithDots(userBalance)}</p>
              </div>
              <div className="flex cursor-pointer items-center rounded-sm bg-amber-400 px-2 py-1 hover:bg-amber-300">
                <h1 className="font-medium">User Guest &nbsp;</h1>
                <CgProfile className="size-8 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden pr-8 md:block xl:pr-16">
          <Button className="bg-slate-900 p-2 hover:bg-slate-700">
            <RiMoonClearLine className="size-6" />
          </Button>
        </div>
        <div className="pr-8 md:hidden">
          <Drawer />
        </div>
      </div>
      <div className="hidden bg-red-700 md:block">
        <ul className="flex items-center justify-center  md:gap-8 lg:gap-12 min-[1140px]:hidden">
          <li className="text-yellow-50 hover:underline">
            <Link href="">Daftar Film</Link>
          </li>
          <li className="text-yellow-50 hover:underline">
            <Link href="">Populer</Link>
          </li>
          <li className="text-yellow-50 hover:underline">
            <Link href="">Upcoming</Link>
          </li>
          <li className="text-yellow-50 hover:underline">
            <NavigationMenu className="z-20">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent p-0 text-yellow-50 underline hover:no-underline">
                    Series
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col gap-1 rounded-md border-2 border-amber-100 bg-stone-900 px-5 py-2">
                    {seriesList.map((series) => (
                      <Link
                        key={series.text}
                        href={series.link}
                        className="w-fit text-amber-50 hover:underline"
                      >
                        {series.text}
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </li>
          <li>
            <NavigationMenu className="z-20">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent p-0 text-yellow-50 underline hover:no-underline">
                    Genre
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex gap-3.5 rounded-md border-2 border-amber-100 bg-stone-900 px-5 py-2">
                    {groupedGenres.map((group, i) => (
                      <div key={`group-${i}`} className="flex flex-col gap-0.5">
                        {group.map((genre) => (
                          <Link
                            key={genre.text}
                            href={genre.link}
                            className="w-fit text-amber-50 hover:underline"
                          >
                            {genre.text}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </li>
        </ul>
      </div>
    </header>
  );
}

export { Header };
