"use client";
import IconBadge from "@/components/icon-badge";
import { useGetCreatorCourseQuery } from "@/redux/slices/courseApiSlice";
import {
	CircleDollarSign,
	File,
	LayoutDashboard,
	ListChecks,
} from "lucide-react";
import TitleForm from "./title-form";
import Banner from "@/components/banner";
import DescriptionForm from "./description-form";
import ImageForm from "./image-form";
import CategoryForm from "./category-form";
import PriceForm from "./price-form";
import ChaptersForm from "./chapters-form";
import { useGetCategoriesQuery } from "@/redux/slices/categoryApiSlice";
import Actions from "./actions";

const CoursePageMain = ({ courseId }) => {
	const { data: course } = useGetCreatorCourseQuery(courseId);
	const { data: categories } = useGetCategoriesQuery();
	// const categories = [
	// 	{
	// 		name: "Web",
	// 		id: "gfhsdghfdkf",
	// 	},
	// 	{
	// 		name: "Web",
	// 		id: "gfhsdghfdkf",
	// 	},
	// ];
	// console.log(course);
	const requiredFields = [
		course?.title,
		course?.description,
		course?.imageUrl,
		course?.price,
		course?.categoryId,
		course?.chapters.some((chapter) => chapter.isPublished),
	];
	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;

	const completionText = `(${completedFields}/${totalFields})`;

	const isComplete = requiredFields.every(Boolean);
	return (
		<>
			{!course?.isPublished && (
				<Banner label="This course is unpublished. It will not be visible to the students." />
			)}

			<div className="p-6">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2">
						<h1 className="text-2xl font-medium">Course setup</h1>
						<span className="text-sm text-slate-700">
							Complete all fields {completionText}
						</span>
					</div>
					<Actions
						disabled={!isComplete}
						courseId={courseId}
						isPublished={course?.isPublished}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl">Customize your course</h2>
						</div>
						<TitleForm
							initialData={course}
							courseId={course?.id}
						/>
						<DescriptionForm
							initialData={course}
							courseId={course?.id}
						/>

						<ImageForm
							initialData={course}
							courseId={course?.id}
						/>

						<CategoryForm
							initialData={course}
							courseId={course?.id}
							options={categories?.map((category) => ({
								label: category?.name,
								value: category?.id,
							}))}
						/>
					</div>
					<div className="space-y-6">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={ListChecks} />
								<h2 className="text-xl">Course chapters</h2>
							</div>
							<ChaptersForm
								initialData={course}
								courseId={course?.id}
							/>
						</div>
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={CircleDollarSign} />
								<h2 className="text-xl">Sell your course</h2>
							</div>
							<PriceForm
								initialData={course}
								courseId={course?.id}
							/>
						</div>
						{/* <div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={File} />
								<h2 className="text-xl">Resources & Attachments</h2>
							</div>
							<AttachmentForm
								initialData={course}
								courseId={course.id}
							/>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default CoursePageMain;
