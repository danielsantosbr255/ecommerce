"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Form from "@/components/forms/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(name, email, password);
  };

  return (
    <div className="flex flex-col w-auto items-center justify-center">
      <Form title="Cadastro">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            required
            type="text"
            placeholder="Seu Nome"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <Input
            required
            type="email"
            placeholder="Seu E-mail"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            required
            minLength={5}
            type="password"
            placeholder="Sua Senha"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Button>
            Cadastrar-se <UserPlus />
          </Button>

          {/* ERROR */}
          {/* {Array.isArray(error) ? (
                        error.map((error: any) => (
                            <p className="text-red-500 text-center">{error}</p>
                        ))
                    ) : (
                        <p className="text-red-500 text-center">{error}</p>
                    )} */}

          <Link href="/auth/signin" className="text-sm text-gray-400 hover:text-secondary text-center">
            Já possui uma conta?
          </Link>
        </form>
      </Form>
    </div>
  );
}
