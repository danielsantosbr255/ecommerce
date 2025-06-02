"use client";

import Logo from "@/components/ui/Logo";
import Input from "@/components/ui/Input";
import { SignUpFormData } from "@/types";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { KeyRound, Loader2, LogIn, Mail, User } from "lucide-react";

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<SignUpFormData>({ mode: "onChange" });
  const { errors } = formState;
  const { signUp, loading } = useAuth();

  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-1 w-full mx-auto px-2 sm:w-lg flex-col gap-10 justify-center items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <User size={60} />
          <h1 className="text-primary font-bold text-3xl sm:text-4xl">Crie sua conta rapidinho</h1>
          <p className="text-center"> comece a comprar agora mesmo!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
          <div className="relative">
            <User size={20} className="absolute top-3 left-3 text-primary" />
            <Input
              type="text"
              placeholder="Nome"
              className="w-full p-3 pl-10"
              {...register("name", {
                required: "Nome é obrigatorio",
                minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres" },
              })}
            />
          </div>
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

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
            <KeyRound size={20} className="absolute top-3 left-3 text-primary" />
            <Input
              type="password"
              {...register("password", {
                required: "Senha é obrigatorio",
                minLength: { value: 5, message: "Senha deve ter pelo menos 5 caracteres" },
              })}
              placeholder="Senha"
              className="w-full p-3 pl-10"
            />
          </div>
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </div>

      <div className="bg-primary flex flex-col w-full gap-4 p-8 text-tx-on-primary justify-center items-center">
        <Logo variant="animated" size={60} />

        <h1 className="font-bold text-3xl">Bem-vindo de volta!</h1>
        <p className="text-center">
          Acesse sua conta para ver seus favoritos, <br /> histórico de compras e ofertas personalizadas.
        </p>
        <Button variant="outline" href="/auth/sign-in">
          Sign In
        </Button>
      </div>
    </div>
  );
}
