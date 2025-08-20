import Sessions from "@/components/common/Sessions";

async function page() {
  return (
    <main className="flex flex-col w-full gap-4">
      <Sessions />
    </main>
  );
}

export default page;
