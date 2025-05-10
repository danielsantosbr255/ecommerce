"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingState from "@/components/LoadingState";
import Profile from "@/app/(shop)/account/_components/Profile";

export default function MyAccount() {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return <LoadingState />;
  }

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-col flex-1 py-4 max-w-10/12 mx-auto">
      <Profile user={user} />
    </div>
  );
}
