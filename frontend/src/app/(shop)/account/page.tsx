import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userService } from "@/services/users";
import Profile from "@/app/(shop)/account/_components/Profile";

export default async function MyAccount() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  console.log(refreshToken);

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
