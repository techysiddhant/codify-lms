import { db } from "@/lib/db";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(req: Request, res: Response) {
	try {
		const session = await getServerSession(authOptions);
		// console.log(session, null, 2);
		if (!session) {
			return new NextResponse("Internal Error", { status: 500 });
		}
		const categories = await db.category.findMany({});

		return NextResponse.json(categories);
	} catch (error) {
		console.log("[Categories]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
