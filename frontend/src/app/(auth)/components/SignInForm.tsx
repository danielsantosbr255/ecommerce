"use client";

import Link from "next/link";
import Input from "@/components/ui/Input";
import { SignInFormData } from "@/types";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthContext";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { IoIosMail, IoMdLock } from "react-icons/io";
import { FaGithub, FaSignInAlt } from "react-icons/fa";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Checkbox from "@/components/ui/Checkbox";

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({ mode: "onChange" });
  const { errors } = formState;
  const { signIn, loading } = useAuth();

  const onSubmit = async (data: SignInFormData) => {
    await signIn(data);
  };

  return (
    <section className="bg-bg-secondary text-tx-primary flex w-full mx-auto p-8 rounded-lg shadow sm:w-lg flex-col gap-4 justify-center items-center">
      <div className="flex flex-col items-center gap-2 justify-center text-tx-primary mb-4">
        <h1 className="text-primary font-bold text-4xl sm:text-5xl">Acesse sua conta</h1>
        <p className="text-center">e comece a comprar com a gente</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Informe seu email"
          icon={<IoIosMail size={20} className="text-primary" />}
          {...register("email", {
            required: "Email é obrigatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        <ErrorMessage message={errors.email?.message} />

        <Input
          id="password"
          label="Senha"
          type="password"
          icon={<IoMdLock size={20} className="text-primary" />}
          {...register("password", { required: "Senha é obrigatoria" })}
          placeholder="Informe sua senha"
        />
        <ErrorMessage message={errors.password?.message} />

        <div className="flex justify-between items-center text-xs sm:text-sm w-full">
          <Checkbox label="Lembrar-me" />

          <Link href="#" className="text-primary hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        <Button
          disabled={loading}
          className={`text-tx-on-primary w-full gap-2 mt-2 ${loading ? "cursor-not-allowed bg-primary/50" : "bg-primary"}`}
        >
          {loading ? (
            <div>
              <Loader2 className="animate-spin" />{" "}
            </div>
          ) : (
            <FaSignInAlt size={20} />
          )}
          {loading ? "Entrando" : "Entrar"}
        </Button>
      </form>

      <div className="flex w-full items-center justify-center gap-2 text-tx-secondary/50">
        <hr className="w-full" />
        <span>ou</span>
        <hr className="w-full" />
      </div>

      <div className="flex w-full gap-2">
        <Button className="w-full gap-2 !border-2 !border-lines !text-tx-secondary text-xs md:text-sm" variant="outline">
          <FcGoogle size={20} />
          Entrar com Google
        </Button>

        <Button className="w-full gap-2 !border-2 !border-lines !text-tx-secondary text-xs md:text-sm" variant="outline">
          <FaGithub size={20} className="text-tx-primary" />
          Entrar com GitHub
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-tx-primary">Ainda nao tem uma conta?</span>
        <Link href="/sign-up" className="text-primary hover:underline">
          Sign Up
        </Link>
      </div>
    </section>
  );
}
