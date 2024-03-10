"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

import { HiMenuAlt1 } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { GiClothes } from "react-icons/gi";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdFavoriteBorder } from "react-icons/md";
import { usePathname } from "next/navigation";
import DarkModeSwitchCustom from "./ThemeToggler";
import { IoMdClose } from "react-icons/io";

export const DashboardNav = () => {
  const [shown, setShown] = useState(true);
  const pathname = usePathname();
  const activeLink = (path) => {
    if (path === pathname || pathname.includes(path)) {
      return "bg-muted-foreground text-background";
    }
  };
  const toggleSidebar = () => {
    setShown(!shown);
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-0 z-10  p-5 bg-card"
      >
        <HiMenuAlt1
          className={`w-6 h-6 absolute top-2 z-10 left-2  ${
            shown ? "hidden" : "block "
          }`}
        />
      </button>
      <aside
        className={`md:static flex-grow h-screen bg-primary-foreground pt-5 border-r border-secondary sidebar ${
          shown ? "shown" : ""
        }`}
      >
        <div className="flex flex-col h-full mx-2 relative ">
          <button onClick={toggleSidebar}>
            <IoMdClose
              className={`w-6 h-6 absolute -top-2 right-2 ${
                shown ? "block md:hidden" : "hidden"
              }`}
            />
          </button>

          <div className="p-3">
            <p className="text-2xl font-bold text1">StyleSync</p>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col space-y-4 w-full font-semibold ">
              <Link
                onClick={toggleSidebar}
                href="/dashboard"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md ${activeLink(
                  "/dashboard"
                )}`}
              >
                <p>Dashboard</p>
              </Link>
              <Link
                onClick={toggleSidebar}
                href="/clothes"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md flex items-center gap-2 ${activeLink(
                  "/clothes"
                )}`}
              >
                <GiClothes className="w-6 h-6" />
                <p> My Clothes</p>
              </Link>
              <Link
                onClick={toggleSidebar}
                href="/favorites"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md flex items-center gap-2 ${activeLink(
                  "/favorites"
                )}`}
              >
                <MdFavoriteBorder className="w-6 h-6" />
                <p>My Favorites</p>
              </Link>
              <Link
                onClick={toggleSidebar}
                href="/outfit"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md flex items-center gap-2 ${activeLink(
                  "/outfit"
                )}`}
              >
                <HiOutlineViewfinderCircle className="w-6 h-6" />
                <p>Pick An Outfit</p>
              </Link>
            </div>
            <div className="flex h-full flex-col justify-end items-center w-full my-2">
              <div className="mb-5">
                <DarkModeSwitchCustom />
              </div>
              <Button
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
                className=" w-full flex"
              >
                <PiSignOutBold className="w-6 h-6" />
                <p className="ml-2 ">Sign out</p>
              </Button>
            </div>
          </div>
        </div>
      </aside>
      <div
        onClick={toggleSidebar}
        className={`md:hidden ${
          shown ? "block" : "hidden"
        } w-full h-screen fixed backdrop-blur-sm z-0`}
      />
    </>
  );
};
