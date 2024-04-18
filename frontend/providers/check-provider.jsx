"use client";

import { logout } from "@/redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CheckProvider = ({ children }) => {
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) {
			const { exp } = jwtDecode(token);
			const checkTokenvalidity = () => {
				// console.log("CHECKING!!");
				if (exp < Date.now() / 1000) {
					dispatch(logout());
				}
			};
			const intervel = setInterval(checkTokenvalidity, 10000);
			return () => clearInterval(intervel);
		}
	}, [token]);
	return <>{children}</>;
};

export default CheckProvider;
