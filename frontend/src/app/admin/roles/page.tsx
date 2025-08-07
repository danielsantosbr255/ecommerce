import RolesTable from "./_components/RolesTable";

export const metadata = {
  title: "Cargos",
};

export const revalidate = 0;

export default function page() {
  return (
    <main className="flex flex-col w-full gap-4">
      <RolesTable />
    </main>
  );
}
