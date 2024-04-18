import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/lib/apiUrl";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { useRouter } from "next/navigation";
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

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["User", "Category", "CustomerSupport", "BusinessSupport"],
	endpoints: (builder) => ({}),
});
apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		expEnd: builder.query({
			query: () => "/auth/profile",
			async onQueryStarted(_, { dispatch, getState, requestId }) {
				const state = getState();
				const token = state.auth.token;
				const router = useRouter();
				if (token) {
					const decoded = jwtDecode(token);
					const currentTime = Math.floor(Date.now() / 1000);
					console.log(token);
					if (decoded.exp < currentTime) {
						dispatch(logout());
						router.push("/login");
					}
				} else {
					router.push("/login");
				}
			},
		}),
	}),
});
// Add global error listener to check for token expiration
// apiSlice.reducer.caseReducers["[api] fetchBaseQuery/rejected"] = (
// 	state,
// 	action
// ) => {
// 	if (action.error && action.error.status === 401) {
// 		// Token expired, clear authentication state
// 		// Note: This assumes you have a slice named 'auth' with a 'clearToken' action
// 		state.dispatch(logout());
// 		// Redirect to login page if necessary
// 	}
// };

// apiSlice.middleware.use(async (ctx, next) => {
// 	const { getState } = ctx.api;
// 	const { auth } = getState();
// 	const decoded = jwtDecode(auth.token);
// 	const dispatch = useDispatch();
// 	console.log(decoded);
// 	if (auth.token && new Date(decoded.exp) > new Date()) {
// 		// Token is valid, proceed with the request
// 		return next(ctx);
// 	} else {
// 		// Token is expired or not present, trigger logout logic
// 		// Dispatch logout action or clear token
// 		// Example:
// 		dispatch(logout());
// 		// throw new Error("Token expired or not present");
// 	}
// });

// apiSlice.middleware.apply(async (req, next) => {
// 	// Perform token expiration check
// 	const { auth } = getState();
// 	const decoded = jwtDecode(auth.token);
// 	console.log(decoded);
// 	const dispatch = useDispatch();
// 	if (auth.token && new Date(decoded.exp) < new Date()) {
// 		// Token expired, clear authentication state
// 		dispatch(logout());
// 		// Redirect to login page if necessary
// 	}

// 	// Proceed with the request
// 	return next(req);
// });
