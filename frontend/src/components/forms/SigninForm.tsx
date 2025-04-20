"use client";

import Link from "next/link";
import Button from "../ui/button";
import Form from "./Form";
import Input from "../ui/Input";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SigninForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current?.value || !passwordRef.current?.value) return;

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const res = await signIn(email, password);

    // console.log("TESTING THIS SHIT");
    // emailRef.current.value = "";
    // passwordRef.current.value = "";
    // router.push("/account");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Form>
        <h1 className="text-2xl font-bold text-center">Entrar</h1>
        <Input required type="email" placeholder="Seu E-mail" ref={emailRef} />
        <Input required minLength={5} type="password" placeholder="Sua Senha" ref={passwordRef} />
        <Button>
          Entrar <LogIn />
        </Button>

        <div className="flex justify-between">
          <Link href="/auth/signup" className="text-sm text-gray-400 hover:text-secondary">
            Não possui uma conta?
          </Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-secondary">
            Esqueceu a senha?
          </Link>
        </div>
      </Form>
    </form>
  );
}
