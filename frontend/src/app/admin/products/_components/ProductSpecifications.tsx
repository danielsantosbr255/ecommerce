import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ProductFormData, ProductSpecification } from "@/lib/schemas/product.schema";
import { UseFieldArrayRemove, UseFieldArrayAppend, FieldError, UseFormRegister, Merge, FieldErrorsImpl } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";

interface ProductSpecificationsProps {
  fields: { id: string; name?: string; value?: string }[];
  register: UseFormRegister<ProductFormData>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<ProductFormData, never>;
  error?: Merge<FieldError, FieldErrorsImpl<ProductSpecification>>;
}

export function ProductSpecifications({ fields, register, remove, append, error }: ProductSpecificationsProps) {
  return (
    <div className="bg-bg-secondary shadow-xs rounded-2xl p-6 space-y-3">
      <h3 className="text-lg font-semibold">Especificações</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Input
            {...register(`specifications.${index}.name` as const)}
            placeholder="Nome"
            className="flex-1 w-full"
            error={error?.name}
          />
          <Input {...register(`specifications.${index}.value` as const)} placeholder="Valor" className="flex-1 w-full" />
          <Button type="button" variant="danger" onClick={() => remove(index)} className="gap-1 !text-sm">
            <FaTrashAlt size={16} /> Remover
          </Button>
        </div>
      ))}
      <Button variant="muted" type="button" onClick={() => append({ name: "", value: "" })} className="">
        + Adicionar Especificação
      </Button>
      {error && <span className="text-tx-error text-sm">{error.message}</span>}
    </div>
  );
}
