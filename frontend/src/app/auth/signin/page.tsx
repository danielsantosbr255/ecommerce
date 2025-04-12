"use client";

import Link from "next/link";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Form from "@/components/forms/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, login } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className=" flex flex-col w-auto items-center justify-center">
      <Form title="Login">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input required type="email" placeholder="Seu E-mail" onChange={handleEmailChange} />
          <Input
            required
            minLength={5}
            type="password"
            placeholder="Sua Senha"
            onChange={handlePasswordChange}
          />
          <Button>
            Entrar <LogIn />
          </Button>

          {/* ERROR */}
          {/* <p className="text-red-500 text-center">{error}</p> */}

          <div className="flex justify-between">
            <Link href="/auth/signup" className="text-sm text-gray-400 hover:text-gray-500">
              Não possui uma conta?
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-gray-500">
              Esqueceu a senha?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
