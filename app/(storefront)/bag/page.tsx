// app/(routes)/bag/BagRouteServer.tsx
import { getBagData } from "../../actions";
import db from "../../../lib/db";
import { redirect } from "next/navigation";
import BagClient from "./bagclient";

export default async function BagRouteServer() {
  const user = await db.user.current();

  if (!user) {
    redirect("/auth/signin");
  }

  const bagData = await getBagData(user.id);

  return <BagClient data={bagData} />;
}
