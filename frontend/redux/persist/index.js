import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage
// import authSlice from "../slices/authSlice";
import { combineReducers } from "redux";
import authSlice from "../slices/authSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"], // Specify which slices to persist
	//   blacklist: ['apiSlice'],
};

const rootReducer = combineReducers({
	auth: authSlice,
	//   [apiSlice.reducerPath]: apiSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
