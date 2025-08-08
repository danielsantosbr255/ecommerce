import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// CREATE
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const response = await api.post("/products", data);

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidateTag("products");

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
