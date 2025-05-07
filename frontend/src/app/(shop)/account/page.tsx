import Profile from "@/components/account/Profile";
import { userService } from "@/services/users";

export default async function MyAccount() {
  const user = await userService.getOwn();

  return (
    <div className="flex flex-col flex-1 py-4 max-w-10/12 mx-auto">
      <Profile user={user} />
    </div>
  );
}
