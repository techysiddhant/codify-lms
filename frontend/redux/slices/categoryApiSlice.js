import { apiSlice } from "./apiSlice";
export const categoryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => ({
				url: "/course/categories",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApiSlice;
