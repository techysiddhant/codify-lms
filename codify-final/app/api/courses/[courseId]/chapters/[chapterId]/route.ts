import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import Env from "@/lib/env";
import {
	CustomSession,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
const mux = new Mux({
	tokenId: Env.MUX_TOKEN_ID,
	tokenSecret: Env.MUX_TOKEN_SECRET,
});
export async function DELETE(
	req: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		if (!session) {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (session?.user?.role !== "CREATOR") {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userId = session?.user?.id;

		const ownCourse = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId!,
			},
		});

		if (!ownCourse) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const chapter = await db.chapter.findUnique({
			where: {
				id: params.chapterId,
				courseId: params.courseId,
			},
		});

		if (!chapter) {
			return new NextResponse("Not Found", { status: 404 });
		}

		if (chapter.videoUrl) {
			const existingMuxData = await db.muxData.findFirst({
				where: {
					chapterId: params.chapterId,
				},
			});

			if (existingMuxData) {
				await mux.video.assets.delete(existingMuxData.assetId);
				await db.muxData.delete({
					where: {
						id: existingMuxData.id,
					},
				});
			}
		}

		const deletedChapter = await db.chapter.delete({
			where: {
				id: params.chapterId,
			},
		});

		const publishedChaptersInCourse = await db.chapter.findMany({
			where: {
				courseId: params.courseId,
				isPublished: true,
			},
		});

		if (!publishedChaptersInCourse.length) {
			await db.course.update({
				where: {
					id: params.courseId,
				},
				data: {
					isPublished: false,
				},
			});
		}

		return NextResponse.json(deletedChapter);
	} catch (error) {
		console.log("[CHAPTER_ID_DELETE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) {
	try {
		const session: CustomSession | null = await getServerSession(authOptions);
		if (!session) {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (session?.user?.role !== "CREATOR") {
			// return NextResponse.json("Unauthorized");
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userId = session?.user?.id;

		const { isPublished, ...values } = await req.json();

		const ownCourse = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId!,
			},
		});
		console.log("ownCourse: ", ownCourse);
		if (!ownCourse) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const chapter = await db.chapter.update({
			where: {
				id: params.chapterId,
				courseId: params.courseId,
			},
			data: {
				...values,
			},
		});
		// console.log("updateChapter : ", chapter);

		if (values.videoUrl) {
			const existingMuxData = await db.muxData.findFirst({
				where: {
					chapterId: params.chapterId,
				},
			});
			// console.log("existing Mux DATA : ", existingMuxData);

			if (existingMuxData) {
				await mux.video.assets.delete(existingMuxData.assetId);
				// console.log("deleting exist mux video: ");

				await db.muxData.delete({
					where: {
						id: existingMuxData.id,
					},
				});
				// console.log("delete mux record: ");
			}

			const asset = await mux.video.assets.create({
				input: values.videoUrl,
				playback_policy: ["public"],
				test: false,
			});
			// console.log("added asset to mux: ", asset);

			await db.muxData.create({
				data: {
					chapterId: params.chapterId,
					assetId: asset.id,
					playbackId: asset.playback_ids?.[0]?.id,
				},
			});
			// console.log("added mux data: ");
		}

		return NextResponse.json(chapter);
	} catch (error) {
		console.log("[COURSES_CHAPTER_ID]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
