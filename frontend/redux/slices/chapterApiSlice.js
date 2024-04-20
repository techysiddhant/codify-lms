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

		videoUploadChapter: builder.mutation({
			query: (formData) => ({
				url: `/chapter/upload-video`,
				method: "POST",
				body: formData,
			}),
		}),
		addAttachment: builder.mutation({
			query: (formData) => ({
				url: `/chapter/attachment`,
				method: "POST",
				body: formData,
			}),
		}),
		removeAttachment: builder.mutation({
			query: (id) => ({
				url: `/chapter/attachment/${id}`,
				method: "DELETE",
			}),
		}),
		publishChapter: builder.mutation({
			query: (chapterId) => ({
				url: `/chapter/publish/${chapterId}`,
				method: "PUT",
			}),
		}),
		unPublishChapter: builder.mutation({
			query: (chapterId) => ({
				url: `/chapter/unpublish/${chapterId}`,
				method: "PUT",
			}),
		}),
		deleteChapter: builder.mutation({
			query: (chapterId) => ({
				url: `/chapter/${chapterId}`,
				method: "DELETE",
			}),
		}),
	}),
});
export const {
	useCreateChapterMutation,
	useGetChapterQuery,
	useUpdateChapterMutation,
	useReorderChapterMutation,
	useVideoUploadChapterMutation,
	useAddAttachmentMutation,
	useRemoveAttachmentMutation,
	usePublishChapterMutation,
	useUnPublishChapterMutation,
	useDeleteChapterMutation,
} = chapterApiSlice;
