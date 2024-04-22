import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserPurchase: builder.query({
			query: (courseId) => ({
				url: `/payment/${courseId}`,
				method: "GET",
			}),
		}),
	}),
});
export const { useGetUserPurchaseQuery } = paymentApiSlice;
