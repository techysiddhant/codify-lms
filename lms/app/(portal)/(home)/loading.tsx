import { Skeleton } from "@/components/ui/skeleton";
const CourseCard = () => {
	return (
		<div className="overflow-hidden border  rounded-lg p-3 h-full ">
			<Skeleton className="w-full aspect-video rounded-md " />
			<div className="flex flex-col pt-4 justify-between gap-4">
				<Skeleton className="w-full h-4 " />
				<Skeleton className="w-full h-4" />
				<Skeleton className="h-4 w-1/3 " />
				<Skeleton className="h-4 w-1/2 " />
				<Skeleton className="h-4 w-2/5 " />
			</div>
		</div>
	);
};
const CategoryItem = () => {
	return (
		<div className="rounded-full w-40 h-14 p-2">
			<Skeleton className="rounded-full w-full h-full" />
		</div>
	);
};
const Loading = () => {
	return (
		<div className="p-6 space-y-4  ">
			<div className="flex items-center gap-x-2 overflow-x-auto pb-2 categories">
				<CategoryItem />
				<CategoryItem />
				<CategoryItem />
			</div>
			<div className="course-list">
				<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
					<CourseCard />
				</div>
			</div>
		</div>
	);
};

export default Loading;
