import { apiSlice } from "./apiSlice";
export const courseApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCourses: builder.query({
			// query: ({}) => ({
			// 	url: "/course/all",
			// 	method: "GET",
			// }),
			query: (data) => {
				console.log(data);
				return {
					// url: `/course/all/?categoryId=${data?.categoryId}&title=${data?.title}`,
					url: `/course/all`,
					method: "GET",
					params: { ...data },
					// body: { data },
				};
			},
		}),
	}),
});

export const { useGetCoursesQuery } = courseApiSlice;
