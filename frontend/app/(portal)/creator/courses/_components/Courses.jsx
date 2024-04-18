"use client";
import DataTable from "./data-table";
import columns from "./columns";
import { useGetCreatorCoursesQuery } from "@/redux/slices/courseApiSlice";

const Courses = () => {
	const { data: courses } = useGetCreatorCoursesQuery();
	console.log(courses);
	return (
		<div className="p-6">
			{courses && (
				<DataTable
					columns={columns}
					data={courses}
				/>
			)}
		</div>
	);
};

export default Courses;
