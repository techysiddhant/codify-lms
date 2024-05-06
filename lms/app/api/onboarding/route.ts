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
				email: session?.user?.email!,
				...values,
			},
		});

		return NextResponse.json(creator);
	} catch (error) {
		console.log("[ON-Boarding]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
export async function PATCH(req: Request) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		const { id,image } = await req.json();
		if (!session) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (session?.user?.role === "USER" ) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if(session?.user?.role === "ADMIN"){
			const creator = await db.creator.update({
				where: {
					id,
				},
				data: {
					status: "approve",
				},
			});
			if (creator) {
				const user = await db.user.update({
					where: {
						id: creator.userId,
					},
					data: {
						role: "CREATOR",
					},
				});
				return NextResponse.json(creator);
			}
		}else if(session?.user?.role === "CREATOR"){
			const creator = await db.creator.update({
				where: {
					id,
				},
				data: {
					image
				},
			});
			return NextResponse.json(creator);
		}
		
		

		return new NextResponse("Something went wrong", { status: 500 });
	} catch (error) {
		console.log("[ON-Boarding]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
