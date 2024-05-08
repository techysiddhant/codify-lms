import { getDashboardCourses } from "@/actions/user.actions";
import {
	CustomSession,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { CoursesList } from "@/components/courses-list";

const Dashboard = async () => {
	const session: CustomSession | null = await getServerSession(authOptions);
	const user = session?.user;
	const { completedCourses, coursesInProgress } = await getDashboardCourses(
		user?.id!
	);
	return (
		<div className="p-6 space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<InfoCard
					icon={Clock}
					label="In Progress"
					numberOfItems={coursesInProgress.length}
				/>
				<InfoCard
					icon={CheckCircle}
					label="Completed"
					numberOfItems={completedCourses.length}
					variant="success"
				/>
			</div>
			<CoursesList items={[...coursesInProgress, ...completedCourses]} />
		</div>
	);
};

export default Dashboard;
