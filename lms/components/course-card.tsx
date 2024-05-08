import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { formatDescription, formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { CourseEnrollButton } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-enroll-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface CourseCardProps {
	id: string;
	title: string;
	imageUrl: string;
	chaptersLength: number;
	price: number;
	progress?: number | null;
	category: string;
	shortDescription: string;
	creatorName: string;
	creatorImage?: string;
}
export const CourseCard = ({
	id,
	title,
	imageUrl,
	chaptersLength,
	price,
	progress,
	category,
	shortDescription,
	creatorName,
	creatorImage,
}: CourseCardProps) => {
	return (
		<Link
			href={`/course/${id}`}
			className=""
		>
			<div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full  ">
				<div className="relative w-full aspect-video rounded-md overflow-hidden">
					<Image
						fill
						className="object-cover"
						alt={title}
						src={imageUrl}
					/>
				</div>
				<div className="flex flex-col pt-2 w-full">
					<div className="text-lg md:text-xl font-medium group-hover:text-sky-700 transition line-clamp-2">
						{title}
					</div>
					<p className=" text-secondary-foreground my-1">
						{formatDescription(shortDescription!)}
					</p>
					<p className="text-sm text-primary font-medium">{category}</p>
					<div className="my-3 flex items-center gap-x-2 text-sm ">
						<div className="flex items-center gap-x-1 text-secondary-foreground font-medium">
							<IconBadge
								size="sm"
								icon={BookOpen}
							/>
							<span>
								{chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
							</span>
						</div>
					</div>
					<div className="mb-1">
						<p className="text-muted-foreground text-sm">Created By:</p>
						<div className="flex items-center gap-x-4 my-1">
							<Avatar>
								<AvatarImage
									src={creatorImage}
									alt="@shadcn"
								/>
								<AvatarFallback>PIC</AvatarFallback>
							</Avatar>
							<h3 className="text-primary font-medium capitalize">{creatorName}</h3>
						</div>
					</div>
					{progress !== null && progress! >= 0 ? (
						<CourseProgress
							variant={progress === 100 ? "success" : "default"}
							size="sm"
							value={progress ? progress : 0}
						/>
					) : (
						<div className="my-2  w-full">
							<CourseEnrollButton
								price={price}
								courseId={id}
							/>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};
