import { NextResponse } from "next/server";
import { getData } from "../../../actions";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getData(params.id);

    if (!data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
