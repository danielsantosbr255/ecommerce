// component.tsx
"use client";

import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { FaUserLock, FaKey } from "react-icons/fa";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Loader2 } from "lucide-react";
import { formatPhone } from "@/utils/formatters";

interface FormData {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword?: string; // Tornar opcional para o caso de não querer alterar a senha
  confirmNewPassword?: string; // Tornar opcional
}

export default function AccessAndSecurity() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Em breve, essa funcionalidade estará disponível.");
    } catch {
      alert("Erro ao realizar alterações. Tente novamente mais tarde.");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhone(e.target.value);
    setValue("phone", formattedValue, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-secondary text-tx-primary shadow-xs p-4 rounded-lg flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <FaUserLock className="text-primary" size={20} />
        <h2 className="text-md font-semibold text-tx-primary">Configurações de Login</h2>
      </div>

      <Input
        type="text"
        id="name"
        label="Nome Completo *"
        {...register("name", {
          required: "Campo obrigatório",
          minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres" },
          maxLength: { value: 50, message: "O nome deve ter no máximo 50 caracteres" },
        })}
      />
      <ErrorMessage message={errors.name?.message} />

      <Input
        type="email"
        id="email"
        label="Email *"
        {...register("email", {
          required: "Campo obrigatório",
          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email inválido" },
        })}
      />
      <ErrorMessage message={errors.email?.message} />

      <Input
        type="tel"
        id="phone"
        label="Telefone"
        inputMode="tel"
        maxLength={15}
        {...register("phone", {
          minLength: { value: 15, message: "O telefone deve ter 11 dígitos" },
          maxLength: { value: 15, message: "O telefone deve ter 11 dígitos" },
          onChange: handlePhoneChange,
        })}
      />
      <ErrorMessage message={errors.phone?.message} />

      <Input
        type="password"
        id="currentPassword"
        label="Senha Atual *"
        {...register("currentPassword", {
          required: "Campo obrigatório",
        })}
      />
      <ErrorMessage message={errors.currentPassword?.message} />

      <Input
        type="password"
        id="newPassword"
        label="Nova Senha"
        {...register("newPassword", {
          minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
          maxLength: { value: 50, message: "A senha deve ter no máximo 50 caracteres" },
        })}
      />
      <ErrorMessage message={errors.newPassword?.message} />

      <Input
        type="password"
        id="confirmNewPassword"
        label="Confirmar Nova Senha"
        {...register("confirmNewPassword", {
          minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
          maxLength: { value: 50, message: "A senha deve ter no máximo 50 caracteres" },
          validate: (value) => value === newPassword || "As senhas não coincidem",
        })}
      />
      <ErrorMessage message={errors.confirmNewPassword?.message} />

      <div className="flex items-center gap-2">
        <Checkbox label="Autenticação de Dois Fatores" />
        <FaKey className="text-primary" />
      </div>
      <Button type="submit">{isSubmitting ? <Loader2 className="animate-material-spin" /> : "Salvar Alterações"}</Button>
    </form>
  );
}
