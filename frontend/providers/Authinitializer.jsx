"use client";

import { login, setToken } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Authinitializer = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (typeof window !== "undefined") {
			const userFromLocalStorage = localStorage.getItem("userData");
			const tokenFromLocalStorage = localStorage.getItem("token");

			if (userFromLocalStorage) {
				dispatch(login(JSON.parse(userFromLocalStorage)));
			}

			if (tokenFromLocalStorage) {
				dispatch(setToken(tokenFromLocalStorage));
			}
		}
	}, [dispatch]);

	return children;
};

export default Authinitializer;
