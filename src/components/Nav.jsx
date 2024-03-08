"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import DarkModeSwitchCustom from "./ThemeToggler";
import { Button } from "./ui/button";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 bg-muted-foreground/30 py-4 backdrop-filter backdrop-blur-lg border-b border-gray-100">
      <div className="flex items-center container mx-auto justify-between    ">
        <Link href={"/"} className="text-xl font-bold text1">StyleSync</Link>
        <nav>
          <ul className="flex items-center space-x-4 ">
            <DarkModeSwitchCustom />
            {session ? (
              <>
                <li>
                  <Link href="/dashboard">
                    <div className="w-[30px] h-[30px] relative ">
                      <Image
                        src={session.user?.image}
                        fill
                        alt=""
                        className="object-cover rounded-full"
                      />
                    </div>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button onClick={() => signIn("google")}>Sign in</Button>
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
