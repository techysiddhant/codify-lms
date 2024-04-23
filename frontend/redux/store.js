import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { userApiSlice } from "./slices/userApiSlice";
import { categoryApiSlice } from "./slices/categoryApiSlice";
import { courseApiSlice } from "./slices/courseApiSlice";
import { apiSlice } from "./slices/apiSlice";
import { chapterApiSlice } from "./slices/chapterApiSlice";
import { paymentApiSlice } from "./slices/paymentApiSlice";

export const store = configureStore({
	reducer: {
		// posts: postsSlice,
		auth: authSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
		[categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
		[courseApiSlice.reducerPath]: courseApiSlice.reducer,
		[chapterApiSlice.reducerPath]: chapterApiSlice.reducer,
		[paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			userApiSlice.middleware,
			courseApiSlice.middleware,
			apiSlice.middleware,
			categoryApiSlice.middleware,
			chapterApiSlice.middleware,
			paymentApiSlice.middleware
		),
});

export const makeStore = () => {
	return configureStore({
		reducer: {
			// posts: postsSlice,
			auth: authSlice,
			[apiSlice.reducerPath]: apiSlice.reducer,
			[userApiSlice.reducerPath]: userApiSlice.reducer,
			[categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
			[courseApiSlice.reducerPath]: courseApiSlice.reducer,
			[chapterApiSlice.reducerPath]: chapterApiSlice.reducer,
			[paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				userApiSlice.middleware,
				courseApiSlice.middleware,
				apiSlice.middleware,
				categoryApiSlice.middleware,
				chapterApiSlice.middleware,
				paymentApiSlice.middleware
			),
	});
};
