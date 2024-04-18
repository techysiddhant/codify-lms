import React from "react";
import CoursePageMain from "./_components/CoursePage";

const CourseIdPage = ({ params }) => {
	console.log("PARAMS :", params);
	return (
		<>
			<CoursePageMain courseId={params?.courseId} />
		</>
	);
};

export default CourseIdPage;
