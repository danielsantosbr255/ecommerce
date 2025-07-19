"use client";

import { Permission } from "@/types";
import Checkbox, { CheckIcon, CheckLabel } from "./Checkbox";

interface Props {
  permissions: Permission[] | null;
}

const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(`Checkbox está ${event.target.checked ? "marcado" : "desmarcado"}`);
};

export default function Permissions({ permissions }: Props) {
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
              onChange={handleCheckboxChange}
              iconPosition="right"
              className="justify-between w-full text-lg"
            >
              <CheckLabel
                className="font-medium"
                label={`${permission.action.charAt(0).toUpperCase()}${permission.action.slice(1).toLowerCase()} ${
                  permission.subject.charAt(0).toUpperCase() + permission.subject.slice(1).toLowerCase()
                }`}
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
