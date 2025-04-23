"use client";

import Link from "next/link";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { FormEvent, useRef } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "../ui/Logo";

export default function SignUpForm() {
  const { signUp, loading } = useAuth();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current?.value || !passwordRef.current?.value) return;

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    await signUp(name, email, password);
  };

  return (
    <div className="flex w-full h-full max-w-8/12 max-h-8/12 text-secondary rounded-2xl overflow-hidden justify-center shadow border-t border-gray-200">
      <div className="bg-gray-50 flex w-3/5 flex-col gap-10 justify-center items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <UserPlus size={60} />
          <h1 className="text-highlight-n font-bold text-5xl">Crie sua conta rapidinho</h1>
          <p className="text-center">e comece a comprar agora mesmo!</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-8/12 gap-2">
          <Input type="text" placeholder="Nome" ref={nameRef} className="w-full p-4" />
          <Input type="email" placeholder="Email" ref={emailRef} className="w-full p-4" />
          <Input type="password" placeholder="Senha" ref={passwordRef} className="w-full p-4" />

          <Button
            type="submit"
            disabled={loading}
            className={`text-white w-full gap-2 mt-2 ${
              loading ? "cursor-not-allowed bg-highlight-n/50" : "bg-highlight-n"
            }`}
          >
            <UserPlus /> Cadastrar
            {loading && (
              <div>
                {" "}
                <Loader2 className="animate-spin" />{" "}
              </div>
            )}
          </Button>
        </form>
      </div>

      <div className="bg-highlight-n  text-white gap-8 flex flex-col w-2/5 px-2 justify-center items-center">
        <Link href="/" className="relative w-20 h-20 flex items-center justify-center animate-bounce">
          <Logo size={60} className="text-white mb-5 absolute z-1" />
          <Logo size={60} className="mb-5 absolute animate-pulse !text-highlight-h/20 scale-120" />
        </Link>

        <h1 className="font-bold text-3xl">Bem-vindo de volta!</h1>
        <p className="text-center">
          Acesse sua conta para ver seus favoritos, <br /> histórico de compras e ofertas personalizadas.
        </p>
        <Link href="/auth/signin" className="border px-5 py-2 rounded-lg shadow">
          Sign In
        </Link>
      </div>
    </div>
  );
}
