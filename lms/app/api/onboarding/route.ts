import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { CustomSession, authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		const values = await req.json();
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		// if (session?.user?.role !== "CREATOR") {
		// 	return new NextResponse("Unauthorized", { status: 401 });
		// }

		const creator = await db.creator.create({
			data: {
				userId: session?.user?.id!,
                email:session?.user?.email!,
                ...values
			},
		});

		return NextResponse.json(creator);
	} catch (error) {
		console.log("[ON-Boarding]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
