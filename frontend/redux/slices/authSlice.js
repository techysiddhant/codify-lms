import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: false,
	userData: null,
	token: null,
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
		logout: (state) => {
			state.status = false;
			state.userData = null;
			state.token = null;
		},
	},
});

export default authSlice.reducer;
export const { login, logout, setToken } = authSlice.actions;
