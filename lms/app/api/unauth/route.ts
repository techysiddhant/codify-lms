import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		// if (!userId || !isTeacher(userId)) {
		// 	return new NextResponse("Unauthorized", { status: 401 });
		// }

		// const categories = await db.category.findMany({});
		// console.log(categories);

		return NextResponse.json({ message: "Unauthorised" });
	} catch (error) {
		console.log("[Categories]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
