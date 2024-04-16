import { apiSlice } from "./apiSlice";
export const courseApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCourses: builder.query({
			query: (data) => ({
				url: "/course/all",
				method: "GET",
				params: { ...data },
			}),
		}),
	}),
});

export const { useGetCoursesQuery } = courseApiSlice;
