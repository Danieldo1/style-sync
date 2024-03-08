"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    // rendering components for logged in users
    return (
      <div className="w-full h-screen flex flex-col ">
        <p className="text-2xl mb-2">
          Welcome <span className="font-bold">{session.user?.name}</span>
        </p>

        <Button
        variant='destructive'
          size="lg"
          onClick={() => signOut()}
          className='w-10'
        >
          Sign out
        </Button>
      </div>
    );
  } else {
    router.push("/");
  }
};

export default DashboardPage;
