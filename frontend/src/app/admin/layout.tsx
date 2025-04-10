import type { Metadata } from "next";
import AdminLayout from "@/components/layouts/AdminLayout";

export const metadata: Metadata = {
    title: "Fireforge Labs - Admin",
    description: "Criado por Daniel Santos",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
)
}
