import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../../../lib/auth"; // Ensure this path is correct
import Image from "next/image";

// Define an interface for the order data structure including nested User and Address
interface OrderData {
    id: string;
    status: string | null;
    amount: number | null;
    createdAt: Date;
    userId: string;
    itemname: string | null;
    itemimage: string | null;
    itemcolor: string | null;
    itemquantity: string | null; // Assuming quantity might be represented as a string like "XL", "M" etc. based on table header 'Size'. Adjust if it's a number.
    User: {
        id: string;
        phoneno: string | null;
        address:{
            street: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        } | null;
    } | null;
}

type AddressType = {
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
} | null;

async function getData(): Promise<OrderData[]> {
  const session = await getServerSession(options);

  // Redirect if user is not authenticated
  if (!session || !session.user?.email) {
    // In server components, redirect needs to be thrown or returned immediately
    redirect("/auth/signin");
  }

  // Fetch user details from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    redirect("/auth/signin"); // Redirect if no user found
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      User: {
        // Select only necessary fields from User and Address
        select: {
          id: true,
          phoneno: true,
          address: {
            select: {
              street: true,
              city: true,
              state: true,
              postalCode: true,
            }
          }
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(orders); // Keep for debugging if needed

  // We need to explicitly cast the result type because Prisma's generated types
  // might not perfectly match our desired structure with nested selections.
  // Ensure the 'include' and 'select' structure matches the OrderData interface.
  return orders as unknown as OrderData[];
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();

  // Helper function to format address safely
  const formatAddress = (address: AddressType | undefined) => {
    if (!address) return "Address not provided";
    const parts = [address.street, address.city, address.state, address.postalCode];
    // Filter out null/empty parts and join
    const validParts = parts.filter(part => part);
    return validParts.length > 0 ? validParts.join(', ') : "Address details incomplete";
  };

  return (
    <Card className="font-glancyr w-full"> {/* Ensure Card takes full width */}
      <CardHeader className="px-4 sm:px-7"> {/* Adjust padding */}
        <CardTitle>Orders</CardTitle>
        <CardDescription>Review your recent orders below.</CardDescription>
        <CardDescription>Note: kindly update contact number and address fields in settings tab if missing.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View (Hidden on small screens, visible md and up) */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead></TableHead> {/* Image col */}
                <TableHead>Payment</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Contact No</TableHead>
                <TableHead>Deliverable Address</TableHead>
                <TableHead className="text-right">Ordered Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item :any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.itemname ?? 'N/A'}</TableCell>
                   <TableCell>
                     <Image
                       alt="Product Image"
                       // Provide a default fallback image if itemimage is null/undefined
                       src={item.itemimage || "/placeholder.svg"} // Use a local or reliable placeholder
                       height={64}
                       width={64}
                       className="rounded-lg object-cover h-16 w-16"
                       unoptimized={!item.itemimage} // Avoid optimizing placeholder URLs if necessary
                     />
                   </TableCell>
                  <TableCell>{item.status ?? 'Pending'}</TableCell>
                  <TableCell>{item.itemcolor ?? 'N/A'}</TableCell>
                  <TableCell>{item.itemquantity ?? 'N/A'}</TableCell>
                   <TableCell className="text-right">
                     ₹{item.amount?.toFixed(2) ?? '0.00'}
                   </TableCell>
                  <TableCell>{item.User?.phoneno ?? 'Not provided'}</TableCell>
                   <TableCell>
                     {/* Format address more readably */}
                     {formatAddress(item.User?.address)}
                   </TableCell>
                  <TableCell className="text-right">
                    {new Intl.DateTimeFormat("en-GB").format(item.createdAt)} {/* Use locale like en-GB for DD/MM/YYYY */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View (Visible on small screens, hidden md and up) */}
        <div className="block md:hidden space-y-4">
          {data.map((item) => (
            <Card key={item.id} className="w-full overflow-hidden">
              <CardContent className="p-4 grid grid-cols-3 gap-4">
                {/* Column 1: Image */}
                <div className="col-span-1 flex items-center justify-center">
                  <Image
                    alt="Product Image"
                    src={item.itemimage || "/placeholder.svg"} // Use consistent placeholder
                    height={80} // Slightly larger for mobile card?
                    width={80}
                    className="rounded-md object-cover h-20 w-20"
                     unoptimized={!item.itemimage}
                  />
                </div>

                {/* Column 2 & 3: Details */}
                <div className="col-span-2 space-y-1 text-sm">
                  <div className="font-semibold">{item.itemname ?? 'N/A'}</div>
                  <div>
                    <span className="font-medium">Amount:</span> ₹{item.amount?.toFixed(2) ?? '0.00'}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> {item.status ?? 'Pending'}
                  </div>
                  {item.itemcolor && <div><span className="font-medium">Color:</span> {item.itemcolor}</div>}
                  {item.itemquantity && <div><span className="font-medium">Quantity:</span> {item.itemquantity}</div>}
                   <div>
                    <span className="font-medium">Order Date:</span> {new Intl.DateTimeFormat("en-GB").format(item.createdAt)}
                  </div>
                </div>

                {/* Full Width Section for Contact/Address */}
                <div className="col-span-3 border-t pt-2 mt-2">
                   <div className="text-sm">
                       <span className="font-medium">Contact:</span> {item.User?.phoneno ?? 'Not provided'}
                   </div>
                   <div className="text-sm mt-1">
                       <span className="font-medium">Address:</span> {formatAddress(item.User?.address)}
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Handle case where there are no orders */}
        {data.length === 0 && (
            <div className="text-center text-gray-500 py-8">
                You have no orders yet.
            </div>
        )}

      </CardContent>
    </Card>
  );
}