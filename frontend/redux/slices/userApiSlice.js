import { apiSlice } from "./apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: () => "/auth/login/google",
			method: "GET",
		}),
	}),
});

export const { useLoginMutation } = userApiSlice;
