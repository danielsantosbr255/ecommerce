import React from "react";
import Logo from "@/components/ui/Logo";
import SignInForm from "../components/SignInForm";

export default function SignIn() {
  return (
    <main className="bg-bg-primary flex flex-col w-full h-full p-2 gap-8 items-center justify-center">
      <div className="flex">
        <Logo variant="animated" className="!text-primary" size={60} />
      </div>
      <SignInForm />
    </main>
  );
}
