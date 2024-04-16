import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { userApiSlice } from "./slices/userApiSlice";
import { categoryApiSlice } from "./slices/categoryApiSlice";
import { courseApiSlice } from "./slices/courseApiSlice";

export const store = configureStore({
	reducer: {
		// posts: postsSlice,
		auth: authSlice,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
		[categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
		[courseApiSlice.reducerPath]: courseApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApiSlice.middleware),
});
