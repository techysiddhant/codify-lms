"use server";

import { db } from "@/lib/db";

export async function fetchCategories() {
	try {
		const categories = await db.category.findMany({});
		return categories;
	} catch (error) {
		console.log("FETCH-CATEGORIES", error);
		throw new Error("Failed to fetch user");
	}
}
