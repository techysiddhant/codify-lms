export default async function getCategories() {
	const response = await fetch("http://localhost:3000/api/categories");
	if (!response.ok) {
		// throw new Error("failed to fetch Categories");
		return null;
	}
	return await response.json();
}
