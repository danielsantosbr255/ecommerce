"use client";

import Logo from "../ui/Logo";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const { user, signUp, loading } = useAuth();

  if (user) redirect("/account");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { email: "", password: "" } });

  const onSubmit = async (data: FormData) => {
    const { name, email, password } = data;
    await signUp({ name, email, password });
  };

  return (
    <div className="flex w-full h-full max-w-8/12 max-h-8/12 text-tx-secondary rounded-2xl overflow-hidden justify-center shadow-xs border-t border-lines">
      <div className="bg-bg-secondary flex w-3/5 flex-col gap-10 justify-center items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <UserPlus size={60} />
          <h1 className="text-primary font-bold text-5xl">Crie sua conta rapidinho</h1>
          <p className="text-center">e comece a comprar agora mesmo!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-8/12 gap-2">
          <Input
            type="text"
            placeholder="Nome"
            className="w-full p-4"
            {...register("name", {
              required: "Nome é obrigatorio",
              minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres" },
            })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          <Input
            type="email"
            placeholder="Email"
            className="w-full p-4"
            {...register("email", {
              required: "Email é obrigatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <Input
            type="password"
            placeholder="Senha"
            className="w-full p-4"
            {...register("password", {
              required: "Senha é obrigatorio",
              minLength: { value: 5, message: "A senha precisa ter pelo menos 5 caracteres" },
            })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <Button
            type="submit"
            disabled={loading}
            className={`text-tx-on-primary w-full gap-2 mt-2 ${
              loading ? "cursor-not-allowed bg-primary/50" : "bg-primary"
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

      <div className="bg-primary  text-tx-on-primary gap-8 flex flex-col w-2/5 px-2 justify-center items-center">
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
