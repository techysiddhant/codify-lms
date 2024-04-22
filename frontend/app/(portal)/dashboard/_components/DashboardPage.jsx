"use client";
import CoursesList from "@/components/courses-list";
import InfoCard from "./info-card";

const DashboardPage = () => {
	return (
		<div className="p-6 space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<InfoCard
					icon={Clock}
					label="In Progress"
					numberOfItems={coursesInProgress?.length}
				/>
				<InfoCard
					icon={CheckCircle}
					label="Completed"
					numberOfItems={completedCourses?.length}
					variant="success"
				/>
			</div>
			<CoursesList items={[...coursesInProgress, ...completedCourses]} />
		</div>
	);
};

export default DashboardPage;
