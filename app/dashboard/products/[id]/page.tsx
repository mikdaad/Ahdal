import { EditForm } from "@/app/components/dashboard/EditForm";
import db from "../../../../lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { Decimal } from "@prisma/client/runtime/library";

async function getData(productId: string) {
  const data = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  
  if (!data) {
    return notFound();
  }
  
  // Convert Decimal fields to numbers
  const formattedData = {
    ...data,
    discountprice: Decimal.isDecimal(data.discountprice) ? data.discountprice.toNumber() : data.discountprice,
    originalprice: Decimal.isDecimal(data.originalprice) ? data.originalprice.toNumber() : data.originalprice,
    stars: Decimal.isDecimal(data.stars) ? data.stars.toNumber() : data.stars,
    dimensions: data.dimensions ?? "", 
    // Ensure dimensions is a string
    warranty: data.warranty ?? "",
    material: data.material ?? "", // Ensure material is a string
    longdescription: data.longdescription ?? "", // Ensure longdescription is a string
    
    // Ensure weight is a string
  };
  
  return formattedData;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  return <EditForm data={data} />;
}
