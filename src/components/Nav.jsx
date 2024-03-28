"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import DarkModeSwitchCustom from "./ThemeToggler";
import { Button } from "./ui/button";

import  Image  from "next/image";
import { useTheme } from "next-themes";
const Nav = () => {
  const { data: session } = useSession();
  const { theme, resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-muted-foreground/30 py-4 backdrop-filter backdrop-blur-lg border-b border-gray-100">
      <div className="flex items-center container mx-auto justify-between    ">
        <div className="flex flex-row items-center justify-center ">
          <Image
            src="/logo2.png"
            alt="Logo"
            width={35}
            height={35}
            className={resolvedTheme === "dark" ? "" : "invert"}
          />
          <p className="text-2xl font-bold text1 -mb-0.5 hidden md:block">
            tyleSync
          </p>
        </div>
        <nav>
          <ul className="flex items-center space-x-4 ">
            <DarkModeSwitchCustom />
            {session ? (
              <>
                <li>
                  <Link href="/clothes" className="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-md">
                    <div className="w-[30px] h-[30px] relative ">
                      <Image
                        src={session.user?.image || "/user.svg"}
                        fill
                        alt=""
                        className="object-cover rounded-full"
                      />
                    </div>
                    <p >Dashboard</p>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button
                    onClick={() => {
                      signIn(["google", "credentials"], {
                        callbackUrl: "/clothes",
                      });
                    }}
                  >
                    Sign in
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
