import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// UPDATE
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.formData();
    const response = await api.put(`/products/${(await params).id}`, data);

    revalidateTag("products");
    revalidatePath("/products");

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await api.delete(`/products/${(await params).id}`);

    revalidateTag("products");
    revalidatePath("/products");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
