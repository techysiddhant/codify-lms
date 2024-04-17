import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	userData: null,
	token: null,
	role: null,
};
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setRole: (state, action) => {
			state.role = action.payload;
		},
		logout: (state) => {
			state.status = false;
			state.userData = null;
			state.token = null;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addMatcher(
	// 		(action) => action.type.endsWith("/rejected"),
	// 		(state, action) => {
	// 			if (action.error && action.error.status === 401) {
	// 				// Token expired, clear authentication state
	// 				// Note: This assumes you have a slice named 'auth' with a 'clearToken' action
	// 				state.dispatch(logout());
	// 				// Redirect to login page if necessary
	// 			}
	// 		}
	// 	);
	// },
});

export default authSlice.reducer;
export const { login, logout, setToken, setRole } = authSlice.actions;
