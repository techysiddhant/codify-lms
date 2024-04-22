import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserPurchase: builder.query({
			query: (courseId) => ({
				url: `/payment/${courseId}`,
				method: "GET",
			}),
		}),
		checkout: builder.mutation({
			query: (courseId) => ({
				url: `/payment/checkout/${courseId}`,
				method: "POST",
				// body: { ...data },
			}),
		}),
	}),
});
export const { useGetUserPurchaseQuery, useCheckoutMutation } = paymentApiSlice;
