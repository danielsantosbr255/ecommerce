// src/components/admin/products/ProductForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductCreateDto, ProductUpdateDto, productSchema } from "@/types";
// import { Form } from "@/components/ui/";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductCreateDto | ProductUpdateDto) => Promise<void>;
  loading: boolean;
}

export function ProductForm({ initialData, onSubmit, loading }: ProductFormProps) {
  const form = useForm<ProductCreateDto | ProductUpdateDto>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Erro no formulário:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input control={form.control} name="name" label="Nome do Produto" placeholder="Digite o nome" />

        <Input
          control={form.control}
          name="description"
          label="Descrição"
          placeholder="Digite a descrição"
          multiline
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input control={form.control} name="price" label="Preço" type="number" />

          <Input control={form.control} name="stock" label="Estoque" type="number" />
        </div>

        <FileUpload control={form.control} name="image" label="Imagem do Produto" />

        <Button type="submit" loading={loading}>
          {initialData ? "Atualizar" : "Criar"} Produto
        </Button>
      </form>
    </Form>
  );
}
