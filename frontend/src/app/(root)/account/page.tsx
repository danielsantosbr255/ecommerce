import Profile from "@/app/(root)/account/_components/Profile";

export default async function MyAccount() {
  return (
    <div className="flex flex-col flex-1 py-4 max-w-10/12 mx-auto">
      <Profile />
    </div>
  );
}
