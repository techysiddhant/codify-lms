import { apiSlice } from "./apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: "/auth/login",
				method: "POST",
				body: { ...data },
			}),
		}),
		signUp: builder.mutation({
			query: (data) => ({
				url: "/auth/signup",
				method: "POST",
				body: { ...data },
			}),
		}),
		logout: builder.mutation({
			query: (data) => ({
				url: "/auth/logout",
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation, useSignUpMutation, useLogoutMutation } =
	userApiSlice;
