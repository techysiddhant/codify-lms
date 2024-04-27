import { db } from "@/lib/db";
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
export async function GET(req: Request, res: Response) {
	try {
		// const session = await getServerSession(req, res, authOptions);
		// console.log(session);
		// if (!userId || !isTeacher(userId)) {
		// 	return new NextResponse("Unauthorized", { status: 401 });
		// }

		const categories = await db.category.findMany({});
		// console.log(categories);

		return NextResponse.json(categories);
	} catch (error) {
		console.log("[Categories]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
