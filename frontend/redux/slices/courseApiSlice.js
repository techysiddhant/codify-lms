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
		updateCreatorCourse: builder.mutation({
			query: (data) => {
				return {
					url: `/course/update/${data.courseId}`,
					method: "PATCH",
					body: { ...data },
				};
			},
		}),
		addCreatorCourseImage: builder.mutation({
			query: (formData) => {
				console.log(formData);
				return {
					url: "/course/image",
					method: "POST",
					// headers: {
					// 	// Add necessary headers for file upload
					// 	"Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
					// },
					body: formData,
					// formData: true,
				};
			},
		}),
		publishCourse: builder.mutation({
			query: (courseId) => {
				return {
					url: `/course/publish/${courseId}`,
					method: "PUT",
				};
			},
		}),
	}),
});

export const {
	useGetCoursesQuery,
	useCreateCourseMutation,
	useGetCreatorCoursesQuery,
	useGetCreatorCourseQuery,
	useUpdateCreatorCourseMutation,
	useAddCreatorCourseImageMutation,
	usePublishCourseMutation,
} = courseApiSlice;
