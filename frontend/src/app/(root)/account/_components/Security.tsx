"use client";

import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthContext";
import { FaUserLock } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { formatPhone } from "@/lib/utils/formatters";
import { TbPasswordUser } from "react-icons/tb";

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
      className="bg-bg-secondary shadow-xs rounded-lg gap-4 p-1 grid grid-cols-1 lg:grid-cols-[3fr_2fr] overflow-hidden"
    >
      <section className="bg-bg-secondary flex flex-col space-y-5 lg:border-r-2 border-dashed border-lines p-5">
        <div className="flex items-center gap-3">
          <FaUserLock className="text-primary" size={20} />
          <h2 className="text-md font-semibold text-tx-primary">Configurações de Login</h2>
        </div>

        <Input
          type="text"
          id="name"
          label="Nome completo *"
          {...register("name", {
            required: "Campo obrigatório",
            minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres" },
            maxLength: { value: 50, message: "O nome deve ter no máximo 50 caracteres" },
          })}
          error={errors.name}
        />

        <Input
          type="email"
          id="email"
          label="Email *"
          {...register("email", {
            required: "Campo obrigatório",
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email inválido" },
          })}
          error={errors.email}
        />

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
          error={errors.phone}
        />

        <Input
          type="password"
          id="currentPassword"
          label="Senha atual *"
          {...register("currentPassword", {
            required: "Campo obrigatório",
          })}
          error={errors.currentPassword}
        />

        <Input
          type="password"
          id="newPassword"
          label="Nova senha"
          {...register("newPassword", {
            minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
            maxLength: { value: 50, message: "A senha deve ter no máximo 50 caracteres" },
          })}
          error={errors.newPassword}
        />

        <Input
          type="password"
          id="confirmNewPassword"
          label="Confirmar nova senha"
          {...register("confirmNewPassword", {
            minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
            maxLength: { value: 50, message: "A senha deve ter no máximo 50 caracteres" },
            validate: (value) => value === newPassword || "As senhas não coincidem",
          })}
          error={errors.confirmNewPassword}
        />

        <Button type="submit">{isSubmitting ? <Loader2 className="animate-material-spin" /> : "Salvar Alterações"}</Button>
      </section>

      <section className="bg-bg-secondary hidden lg:flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <TbPasswordUser className="text-primary/70" size={150} />

          <div className="flex flex-col gap-2 text-tx-primary/80 text-lg">
            <p className="font-semibold">Sua senha deve conter:</p>
            <ul>
              <li>&#x2022; Pelo menos 6 caracteres</li>
              <li>&#x2022; Pelo menos um número</li>
              <li>&#x2022; Pelo menos uma letra maiúscula</li>
              <li>&#x2022; Pelo menos um caractere especial</li>
            </ul>
          </div>
        </div>
      </section>
    </form>
  );
}
