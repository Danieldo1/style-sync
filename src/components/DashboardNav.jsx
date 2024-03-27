"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

import { HiMenuAlt1 } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { GiClothes } from "react-icons/gi";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdFavoriteBorder, MdManageAccounts } from "react-icons/md";
import { usePathname } from "next/navigation";
import DarkModeSwitchCustom from "./ThemeToggler";
import { IoMdClose } from "react-icons/io";
import ProUser from "./ProUser";
import { fetchUserId } from "@/lib/fetchWeatherData";
import {useTheme} from "next-themes";

export const DashboardNav = () => {
  const [shown, setShown] = useState(true);
  const [isPro, setIsPro] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const { data: session } = useSession();
const { resolvedTheme } = useTheme();
  const email = session && session.user.email;
  useEffect(() => {
   
    if (email) {
      getUserData();
     
    } 
  }, [email]);
  const getUserData = async () => {
    const userData = await fetchUserId(email);
    setIsPro(userData.isPro);
     setLoading(false);
  };
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

          <div className="p-3 flex flex-row items-center justify-center border-b">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={50}
              height={50}
              className={resolvedTheme === "dark" ? "" : "invert"}
            />
            <p className="text-3xl font-bold text1 -mb-3">tyleSync</p>
          </div>
          <div className="flex flex-col h-full justify-between  ">
            <div className="flex flex-col space-y-4 mt-5 w-full font-semibold ">
              <Link
                onClick={toggleSidebar}
                href="/clothes"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md flex items-center gap-2 ${activeLink(
                  "/clothes"
                )}`}
              >
                <GiClothes className="w-6 h-6" />
                <p>Closet</p>
              </Link>
              <Link
                onClick={toggleSidebar}
                href="/favorites"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md flex items-center gap-2 ${activeLink(
                  "/favorites"
                )}`}
              >
                <MdFavoriteBorder className="w-6 h-6" />
                <p>Favorites</p>
              </Link>
              <Link
                onClick={toggleSidebar}
                href="/outfit"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md flex items-center gap-2 ${activeLink(
                  "/outfit"
                )}`}
              >
                <HiOutlineViewfinderCircle className="w-6 h-6" />
                <p>Find Outfit</p>
              </Link>
              <Link
                onClick={toggleSidebar}
                href="/dashboard"
                className={`hover:bg-muted-foreground hover:text-background p-2 rounded-md flex items-center gap-2 ${activeLink(
                  "/dashboard"
                )}`}
              >
                <MdManageAccounts className="w-6 h-6" />
                <p>Account</p>
              </Link>
            </div>
            <div className="flex h-fit flex-col justify-end items-center w-full my-2 pb-[calc(40vh-200px)] md:pb-0 md:mb-2">
              <div className="mb-5">
                <DarkModeSwitchCustom />
              </div>
              {isPro === false && (
                <div className="w-full mb-5 ">
                  <ProUser email={email} loading={loading} />
                </div>
              )}

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
        } w-full h-screen fixed backdrop-blur-sm z-10`}
      />
    </>
  );
};
