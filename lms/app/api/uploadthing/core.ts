// import { auth } from "@clerk/nextjs";
import { getServerSession } from "next-auth/next";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { CustomSession, authOptions } from "../auth/[...nextauth]/route";

// import { isTeacher } from "@/lib/teacher";

const f = createUploadthing();

const handleAuth = async () => {
	const session: CustomSession | null = await getServerSession(authOptions);
	const userId = session?.user?.id;

	const isAuthorized = session?.user?.role === "CREATOR";

	if (!userId || !isAuthorized) throw new Error("Unauthorized");
	return { userId };
};

export const ourFileRouter = {
	courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
	courseAttachment: f(["text", "image", "video", "audio", "pdf"])
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
	chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
	creatorImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
