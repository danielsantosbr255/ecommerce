import RoleEditPage from "../_components/RoleEdit";

export const revalidate = 0;

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <RoleEditPage id={id} />;
}
