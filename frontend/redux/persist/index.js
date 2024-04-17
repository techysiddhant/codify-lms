// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Default: localStorage
// import authSlice from "../slices/authSlice";
// import { combineReducers } from "redux";
import authSlice from "../slices/authSlice";

// const persistConfig = {
// 	key: "root",
// 	storage,
// 	whitelist: ["auth"], // Specify which slices to persist
// 	//   blacklist: ['apiSlice'],
// };

// const rootReducer = combineReducers({
// 	auth: authSlice,
// 	//   [apiSlice.reducerPath]: apiSlice.reducer,
// });

// export const persistedReducer = persistReducer(persistConfig, rootReducer);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { userApiSlice } from "../slices/userApiSlice";
import { categoryApiSlice } from "../slices/categoryApiSlice";
import { courseApiSlice } from "../slices/courseApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { apiSlice } from "../slices/apiSlice";
const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve(null);
		},
		setItem(_key, value) {
			return Promise.resolve(value);
		},
		removeItem() {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage();

const authPersistConfig = {
	key: "auth",
	storage: storage,
	whitelist: ["authState", "initialState", "auth"],
};
// const persistedReducer = persistReducer(authPersistConfig, authSlice);
const rootReducer = combineReducers({
	auth: authSlice,
	[apiSlice.reducerPath]: apiSlice.reducer,
	[userApiSlice.reducerPath]: userApiSlice.reducer,
	[categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
	[courseApiSlice.reducerPath]: courseApiSlice.reducer,
});
const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	// [apiSlice.reducerPath]: apiSlice.reducer,
	// [userApiSlice.reducerPath]: userApiSlice.reducer,
	// [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
	// [courseApiSlice.reducerPath]: courseApiSlice.reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			(store) => (next) => (action) => {
				return next(action);
			},
			apiSlice.middleware,
			userApiSlice.middleware,
			categoryApiSlice.middleware,
			courseApiSlice.middleware
		),
});
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
