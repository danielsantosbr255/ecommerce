import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-neutral-100 flex flex-col h-screen w-full items-center">
      <main className="flex flex-1 w-full items-center justify-center">{children}</main>
    </div>
  );
}
