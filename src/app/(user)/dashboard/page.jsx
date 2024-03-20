"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { data: session } = useSession();
  const email = session && session.user.email;
  const router = useRouter();
  

  const subscribeUser = async () => {
    try {
      const response = await axios.get("/api/payment?email=" + email);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Something went wrong, please try again later");
    }
  };

  if (session) {
    // rendering components for logged in users
    return (
      <div className="w-full h-screen flex flex-col ">
        <p className="text-4xl mb-2">
          Welcome <span className="font-bold">{session.user?.name}</span>
        </p>

        <button onClick={subscribeUser}>Subscribe Now</button>
      </div>
    );
  }
};

export default DashboardPage;
