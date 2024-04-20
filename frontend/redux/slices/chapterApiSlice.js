import { apiSlice } from "./apiSlice";

export const chapterApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createChapter: builder.mutation({
			query: (data) => ({
				url: `/chapter/create/${data.courseId}`,
				method: "POST",
				body: { ...data },
			}),
		}),
		getChapter: builder.query({
			query: (data) => ({
				url: `/chapter/${data.chapterId}`,
				method: "GET",
			}),
		}),
		updateChapter: builder.mutation({
			query: (data) => ({
				url: `/chapter/update/${data.chapterId}`,
				method: "PATCH",
				body: { ...data },
			}),
		}),
		reorderChapter: builder.mutation({
			query: (data) => ({
				url: `/chapter/reorder/${data.courseId}`,
				method: "PATCH",
				body: { ...data },
			}),
		}),
	}),
});
export const {
	useCreateChapterMutation,
	useGetChapterQuery,
	useUpdateChapterMutation,
	useReorderChapterMutation,
} = chapterApiSlice;
