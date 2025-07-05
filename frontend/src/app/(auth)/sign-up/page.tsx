import React from "react";

import SignUpForm from "../components/SignUpForm";
import Logo from "@/components/ui/Logo";

export default function SignUp() {
  return (
    <main className="bg-bg-primary flex flex-col w-full h-full p-2 gap-8 items-center justify-center">
      <div className="flex">
        <Logo variant="animated" className="!text-primary" size={60} />
      </div>
      <SignUpForm />
    </main>
  );
}
