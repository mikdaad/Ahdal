import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2,IndianRupee } from "lucide-react";


async function getData() {
  try {
    const [users, products, orders] = await Promise.all([
      prisma.user.findMany({
        select: { id: true },
      }),

      prisma.product.findMany({
        select: { id: true },
      }),

      prisma.order.findMany({
        select: { amount: true },
      }),
    ]);

    return { users, products, orders };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}




export async function DashboardStats() {
  const { products, users, orders } = await getData();

  const totalAmount = orders.reduce((accumalator, currentValue) => {
    return accumalator + currentValue.amount;
  }, 0);
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <div>
        <CardHeader className="relative flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-green-500" />
           
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
          ₹{totalAmount}
          </p>
          <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      
        </div>
       
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{orders.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Sales on Terrific
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Products created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <User2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}
