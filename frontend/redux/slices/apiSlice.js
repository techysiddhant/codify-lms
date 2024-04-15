import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/lib/apiUrl";
const baseQuery = fetchBaseQuery({
	baseUrl: apiUrl,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		// const token = getState().persistedReducer.auth.token;
		const token = getState().auth.token;
		if (token) {
			headers.set("Authorization", `bearer ${token}`);
			headers.set("Content-Type", "application/json");
		}
		return headers;
	},
});
// const baseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL });

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["User", "Category", "CustomerSupport", "BusinessSupport"],
	endpoints: (builder) => ({}),
});
