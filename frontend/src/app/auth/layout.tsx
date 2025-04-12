import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col bg-gray-100 h-screen p-4">
      <Link
        href="/"
        className="inline-flex items-center text-gray-700 hover:text-amber-500 transition duration-300 mt-10 ml-5 group"
      >
        <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition duration-300" />
        <span className="font-medium">Voltar para a Loja</span>
      </Link>
      <main className="pt-20 flex-1">{children}</main>
    </div>
  );
}
