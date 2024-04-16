import { configureStore } from "@reduxjs/toolkit";
// import { userApiSlice } from "../slices/usersApiSlice.js";
// import { categoryApiSlice } from "../slices/categoryApiSlice.js";

import { persistedReducer } from "./index.js";
import { persistStore } from "redux-persist";
import { userApiSlice } from "../slices/userApiSlice.js";
import { categoryApiSlice } from "../slices/categoryApiSlice.js";
import { courseApiSlice } from "../slices/courseApiSlice.js";

export const store = configureStore({
	reducer: {
		persistedReducer,

		[userApiSlice.reducerPath]: userApiSlice.reducer,
		[categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
		[courseApiSlice.reducerPath]: courseApiSlice.reducer,
		// [supportApiSlice.reducerPath]: supportApiSlice.reducer,
		// [customerApiSlice.reducerPath]: customerApiSlice.reducer,
		// [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
		// [orderApiSlice.reducerPath]: orderApiSlice.reducer,
		// [storeApiSlice.reducerPath]: storeApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Optionally ignore certain actions
				ignoredActions: ["persist/PERSIST"],
			},
		}).concat(
			(store) => (next) => (action) => {
				// console.log("Dispatching:", action);
				return next(action);
			},

			userApiSlice.middleware,
			categoryApiSlice.middleware,
			courseApiSlice.middleware
			// supportApiSlice.middleware,
			// customerApiSlice.middleware,
			// dashboardApiSlice.middleware,
			// orderApiSlice.middleware,
			// storeApiSlice.middleware
		),
});

// Persist the store's state
export const persistor = persistStore(store);
