export default async function getCreatorCourses() {
	const response = await fetch(
		"http://localhost:3000/api/courses/creator/courses/get-courses",
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	if (!response.ok) {
		// throw new Error("failed to fetch Categories");
		return null;
	}
	return await response.json();
}
