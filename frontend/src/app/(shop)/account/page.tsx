import { userService } from "@/services/users";
import Profile from "@/app/(shop)/account/_components/Profile";
import { cookies } from "next/headers";
import { setServerCookies } from "@/lib/api/axios";

export default async function MyAccount() {
  setServerCookies((await cookies()).toString());

  const user = await userService.getOwn();

  return (
    <div className="flex flex-col flex-1 py-4 max-w-10/12 mx-auto">
      <Profile user={user} />
    </div>
  );
}
