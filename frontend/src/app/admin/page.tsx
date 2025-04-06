import React from "react";
import { User } from "lucide-react";
import Link from "next/link";

export default function Admin() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Admin Dashboard</h1>
            <Link href="/admin/products">
                <User size={24} /> Manage Products
            </Link>
            <Link href="/admin/orders">
                <User size={24} /> Manage Orders
            </Link>
            <Link href="/admin/users">
                <User size={24} /> Manage Users
            </Link>
        </div>
    );
}
