import Profile from "@/app/(root)/account/_components/Profile";
import { cookies } from "next/headers";

export default async function MyAccount() {
  const cookieStore = await cookies();
  console.log("🚨 Cookies recebidos:", cookieStore);

  return (
    <div className="flex flex-col flex-1 py-4 max-w-10/12 mx-auto">
      <Profile />
    </div>
  );
}
