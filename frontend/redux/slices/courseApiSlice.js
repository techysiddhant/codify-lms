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
		createCourse: builder.mutation({
			query: (data) => ({
				url: "/course/create",
				method: "POST",
				body: { ...data },
			}),
			// invalidatesTags: [{ type: "Course", id: "LIST" }],
		}),
	}),
});

export const { useGetCoursesQuery, useCreateCourseMutation } = courseApiSlice;
