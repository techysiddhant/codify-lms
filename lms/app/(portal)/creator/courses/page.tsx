import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import fetchCreatorCourses from "@/actions/creator.actions";

const CreatorCourses = async () => {
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
