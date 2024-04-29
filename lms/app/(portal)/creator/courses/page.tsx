// import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import getCreatorCourses from "@/actions/getCreatorCourses";
import fetchCreatorCourses from "@/actions/creator.actions";

const CreatorCourses = async () => {
	// const courses = await getCreatorCourses();
	// const response = await fetch(
	// 	"http://localhost:3000/api/courses/creator/courses/get-courses"
	// );
	// const data = await response.json();
	// console.log("Courses", data);
	const courses = await fetchCreatorCourses();
	return (
		<div className="p-6">
			<DataTable
				columns={columns}
				data={courses ? courses : []}
			/>
		</div>
	);
};

export default CreatorCourses;
