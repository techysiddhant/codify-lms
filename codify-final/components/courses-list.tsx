import { Category, Course, Creator } from "@prisma/client";

import { CourseCard } from "@/components/course-card";
type CourseWithProgressWithCategory = Course & {
	category: Category | null;
	chapters: { id: string }[];
	progress?: number | null;
	creator: { displayName: string; image: string | null } | null;
};

interface CoursesListProps {
	items: CourseWithProgressWithCategory[];
}
export const CoursesList = ({ items }: CoursesListProps) => {
	return (
		<div>
			<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
				{items.map((item) => (
					<CourseCard
						key={item?.id}
						id={item?.id}
						title={item?.title}
						imageUrl={item?.imageUrl!}
						chaptersLength={item?.chapters?.length!}
						price={item?.price!}
						progress={item?.progress!}
						category={item?.category?.name!}
						shortDescription={item?.shortDescription!}
						creatorName={item?.creator?.displayName!}
						creatorImage={item?.creator?.image!}
					/>
				))}
			</div>
			{items.length === 0 && (
				<div className="text-center text-sm text-muted-foreground mt-10">
					No courses found
				</div>
			)}
		</div>
	);
};
