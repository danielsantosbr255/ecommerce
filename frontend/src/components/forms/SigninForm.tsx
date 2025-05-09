"use client";

import Link from "next/link";
import Logo from "../ui/Logo";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, LogIn, User } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const { signIn, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    await signIn({ email, password });
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full md:max-w-8/12 m-2 max-h-11/12 md:max-h-8/12 text-tx-secondary rounded-2xl overflow-hidden justify-center shadow-xs border-t border-lines">
      <div className="bg-primary  text-tx-on-primary gap-8 flex flex-col w-full md:w-2/5 px-2 justify-center items-center">
        <Logo variant="animated" size={60} />

        <h1 className="font-bold text-3xl">Junte-se a nós!</h1>
        <p className="text-center">
          Ao se cadastrar, você poderá salvar seus itens preferidos, <br /> agilizar suas compras futuras e
          receber novidades em primeira mão.
        </p>
        <Button variant="outline" href="/auth/sign-up">
          Sign Up
        </Button>
      </div>

      <div className="bg-bg-secondary flex flex-1 md:w-3/5 flex-col gap-10 justify-center items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <User size={60} />
          <h1 className="text-primary font-bold text-5xl">Acesse sua conta</h1>
          <p className="text-center">e comece a comprar com a gente</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-8/12 gap-2">
          <Input
            type="email"
            placeholder="Email"
            className="w-full p-4"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
            })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          <Input
            type="password"
            placeholder="Senha"
            className="w-full p-4"
            {...register("password", { required: "Senha é obrigatória" })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="accent-primary p-2" />
              <span>Manter-me conectado</span>
            </div>
            <Link href="" className="text-primary hover:underline">
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`text-tx-on-primary w-full gap-2 mt-2 ${
              loading ? "cursor-not-allowed bg-primary/50" : "bg-primary"
            }`}
          >
            <LogIn /> Entrar
            {loading && (
              <div>
                {" "}
                <Loader2 className="animate-spin" />{" "}
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
