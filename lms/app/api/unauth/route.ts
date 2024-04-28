import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		const { title } = await req.json();
		// if (!userId || !isTeacher(userId)) {
		// 	return new NextResponse("Unauthorized", { status: 401 });
		// }

		// const categories = await db.category.findMany({});
		// console.log(categories);

		return NextResponse.json({ message: "sucess", session, title });
	} catch (error) {
		console.log("[Categories]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
