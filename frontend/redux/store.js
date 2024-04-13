import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { userApiSlice } from "./slices/userApiSlice";

export const store = configureStore({
	reducer: {
		// posts: postsSlice,
		auth: authSlice,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApiSlice.middleware),
});
