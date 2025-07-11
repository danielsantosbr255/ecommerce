"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SignUpFormData } from "@/types";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthContext";
import { IoIosMail, IoMdLock } from "react-icons/io";
import { FaGithub, FaUser, FaUserPlus } from "react-icons/fa";
import Checkbox from "@/components/ui/Checkbox";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<SignUpFormData>({ mode: "onChange" });
  const { errors } = formState;
  const { signUp, loading } = useAuth();

  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data);
  };

  return (
    <section className="bg-bg-secondary text-tx-primary flex w-full mx-auto p-8 rounded-lg shadow sm:w-lg flex-col gap-4 justify-center items-center">
      <div className="flex flex-col items-center gap-2 justify-center mb-4">
        <h1 className="text-primary font-bold text-3xl sm:text-4xl">Crie sua conta rapidinho</h1>
        <p className="text-center"> comece a comprar agora mesmo!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
        <Input
          id="text"
          label="Nome"
          type="text"
          icon={<FaUser className="text-primary" />}
          {...register("name", {
            required: "Nome é obrigatorio",
            minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres" },
          })}
          placeholder="Informe seu nome"
        />
        <ErrorMessage message={errors.name?.message} />

        <Input
          id="email"
          label="Email"
          type="email"
          icon={<IoIosMail size={20} className="text-primary" />}
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          placeholder="Informe seu email"
        />
        <ErrorMessage message={errors.email?.message} />

        <Input
          id="password"
          label="Senha"
          type="password"
          icon={<IoMdLock size={20} className="text-primary" />}
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: { value: 5, message: "Senha deve ter pelo menos 5 caracteres" },
          })}
          placeholder="Informe sua senha"
        />
        <ErrorMessage message={errors.password?.message} />

        <Checkbox label="Eu concordo com os termos e condicões" />

        <Button
          disabled={loading}
          className={`text-tx-on-primary w-full gap-2 mt-2 ${loading ? "cursor-not-allowed bg-primary/50" : "bg-primary"}`}
        >
          {loading ? (
            <div>
              <Loader2 className="animate-spin" />{" "}
            </div>
          ) : (
            <FaUserPlus size={20} />
          )}
          {loading ? "Criando sua conta" : "Criar conta"}
        </Button>
      </form>

      <div className="flex w-full items-center justify-center gap-2 text-tx-secondary/50">
        <hr className="w-full" />
        <span className="">ou</span>
        <hr className="w-full" />
      </div>

      <div className="flex w-full gap-2">
        <Button className="w-full gap-2 !border-2 !border-lines !text-tx-secondary text-xs md:text-sm" variant="outline">
          <FcGoogle size={20} /> Registre-se com Google
        </Button>

        <Button className="w-full gap-2 !border-2 !border-lines !text-tx-secondary text-xs md:text-sm" variant="outline">
          <FaGithub size={20} className="text-tx-primary" /> Registre-se com Github
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-tx-primary">Ja possui uma conta?</span>
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </section>
  );
}
