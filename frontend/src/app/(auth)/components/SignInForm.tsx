"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Input from "@/components/ui/Input";
import { SignInFormData } from "@/types";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, LogIn, Mail, User, LockKeyhole } from "lucide-react";

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({ mode: "onChange" });
  const { errors } = formState;
  const { signIn, loading } = useAuth();

  const onSubmit = async (data: SignInFormData) => {
    await signIn(data);    
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-1 w-full mx-auto px-2 sm:w-lg flex-col gap-10 justify-center items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <User size={60} />
          <h1 className="text-primary font-bold text-4xl sm:text-5xl">Acesse sua conta</h1>
          <p className="text-center">e comece a comprar com a gente</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
          <div className="relative">
            <Mail size={20} className="absolute top-3 left-3 text-primary" />
            <Input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10"
              {...register("email", {
                required: "Email é obrigatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
          </div>
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <div className="relative">
            <LockKeyhole size={20} className="absolute top-3 left-3 text-primary" />
            <Input
              type="password"
              {...register("password", { required: "Senha é obrigatorio" })}
              placeholder="Senha"
              className="w-full p-3 pl-10"
            />
          </div>
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <div className="flex justify-between items-center text-xs sm:text-sm w-full">
            <div className="flex flex-1 gap-2 items-center w-full">
              <input type="checkbox" className="accent-primary p-2" />
              <span>Manter-me conectado</span>
            </div>
            <Link href="" className="text-primary hover:underline">
              Esqueci minha senha
            </Link>
          </div>

          <Button
            disabled={loading}
            className={`text-tx-on-primary w-full gap-2 mt-2 ${
              loading ? "cursor-not-allowed bg-primary/50" : "bg-primary"
            }`}
          >
            {loading ? (
              <div>
                <Loader2 className="animate-spin" />{" "}
              </div>
            ) : (
              <LogIn />
            )}
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>

      <div className="bg-primary flex flex-col w-full gap-4 p-8 text-tx-on-primary justify-center items-center">
        <Logo variant="animated" size={60} />

        <h1 className="font-bold text-3xl">Junte-se a nós!</h1>
        <p className="text-center">
          Ao se cadastrar, você poderá salvar seus itens preferidos, <br /> agilizar suas compras futuras e
          receber novidades em primeira mão.
        </p>
        <Button variant="outline" href="/sign-up">
          Sign Up
        </Button>
      </div>
    </div>
  );
}
