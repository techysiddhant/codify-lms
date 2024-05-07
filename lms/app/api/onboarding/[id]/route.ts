import { getServerSession } from "next-auth/next";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		const values = await req.json();
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		// if (session?.user?.role !== "CREATOR") {
		// 	return new NextResponse("Unauthorized", { status: 401 });
		// }

		const creator = await db.creator.update({
			where: {
				id: params?.id,
			},
			data: {
				...values,
			},
		});

		return NextResponse.json(creator);
	} catch (error) {
		console.log("[ON-Boarding-UPDATE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
