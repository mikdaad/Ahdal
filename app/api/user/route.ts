import { NextResponse } from "next/server";
import db from "../../../lib/db";


export async function GET(req: Request) {


  try {
    
  
    const user = await db.user.current(); 
    console.log("defintion : " + user?.email);
  

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await db.user.findUnique({
      where: { email: user.email },
    
    });

   
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userAddress = await db.address.findUnique({
      where: { userId: existingUser.id },
    });

    return NextResponse.json({
      userId: existingUser.id,  
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      profileImage: existingUser.profileImage,
      street: userAddress?.street || "",
      city: userAddress?.city || "",
      state: userAddress?.state || "",
      postalCode: userAddress?.postalCode || "",
      phoneno: userAddress?.phoneno || "",
      shippingnote: userAddress?.shippingnote || "",
      
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await db.user.current();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse JSON request body safely
    let formData;
    try {
      formData = await req.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { firstName, lastName, street, city, state, postalCode,phoneno,shippingnote } = formData;

    // Validate user existence
    const existingUser = await db.user.findUnique({
      where: { email: user.email },
      include: { address: true }, // Ensure address is fetched
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user with nested address upsert
    const updatedUser = await db.user.update({
      where: { email: user.email },
      data: {
        firstName,
        lastName,
        phoneno,
        address: {
          upsert: {
            where: { id: existingUser.id }, // Ensure unique address is updated
            create: { shippingnote, street, city, state, postalCode,phoneno,  id: existingUser.id },
            update: {shippingnote, street, city, state, postalCode,phoneno },
          },
        },
      },
      include: { address: true }, // Include updated address in response
    });

    return NextResponse.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
