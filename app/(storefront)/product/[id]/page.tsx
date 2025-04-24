import { notFound } from "next/navigation";
import { getData } from "../../../actions";
import NewProductPage from "@/app/components/newcomponents/newproductpage";

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  if (!data) return notFound();

  return <NewProductPage data={data} />; // Render Client Component
}
