import { cookies } from "next/headers";
import { userService } from "@/services/users";
import { setServerCookies } from "@/lib/api/axios";
import Profile from "@/app/(shop)/account/_components/Profile";
import { redirect } from "next/navigation";

export default async function MyAccount() {
  setServerCookies((await cookies()).toString());
  const user = await userService.getOwn();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-col flex-1 py-4 max-w-10/12 mx-auto">
      <Profile user={user} />
    </div>
  );
}
