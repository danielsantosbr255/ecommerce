"use client";

import { Permission } from "@/types";
import Checkbox, { CheckIcon, CheckLabel } from "./Checkbox";

interface Props {
  permissions: Permission[] | null;
  handleCheckboxChange: (id: number) => void;
  selectedPermissions: number[];
}

const TRANSLATIONS = {
  CREATE: "Criar",
  READ: "Ler",
  UPDATE: "Atualizar",
  DELETE: "Deletar",
  MANAGE: "Gerenciar",
  ALL: "Todos",
  USER: "Usuários",
  ADDRESS: "Endereços",
  SESSION: "Sessões",
  REVIEW: "Avaliações",
  CART: "Carrinhos",
  ORDER: "Pedidos",
  PRODUCT: "Produtos",
};

const getPermissionName = (permission: string) => {
  return TRANSLATIONS[permission.toUpperCase() as keyof typeof TRANSLATIONS] || permission;
};

export default function Permissions({ permissions, selectedPermissions, handleCheckboxChange }: Props) {
  if (!permissions) {
    return <div className="w-full h-full flex items-center justify-center">Nenhuma permissão encontrada.</div>;
  }

  return (
    <div className="flex flex-col gap-2  border-t-2 border-dashed border-lines">
      <div className="flex flex-col gap-1">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex flex-col gap-1 border-b border-lines last:border-b-0 p-3">
            <Checkbox
              id="rememberMe"
              checked={selectedPermissions.includes(permission.id)}
              onChange={() => handleCheckboxChange(permission.id)}
              iconPosition="right"
              className="justify-between w-full text-lg"
            >
              <CheckLabel
                className="font-medium"
                label={`${getPermissionName(permission.action)} ${getPermissionName(permission.subject).toLowerCase()}`}
              />
              <CheckIcon size={15} />
            </Checkbox>
            <span className="text-tx-secondary">{permission.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
