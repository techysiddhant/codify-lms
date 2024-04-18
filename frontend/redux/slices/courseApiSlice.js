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
		}),
		getCreatorCourses: builder.query({
			query: () => ({
				url: "/course/creator/courses",
				method: "GET",
			}),
		}),
		getCreatorCourse: builder.query({
			query: (courseId) => ({
				url: `/course/creator/${courseId}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetCoursesQuery,
	useCreateCourseMutation,
	useGetCreatorCoursesQuery,
	useGetCreatorCourseQuery,
} = courseApiSlice;
