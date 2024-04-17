"use client";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchInput from "./search-input";
import LoginButton from "@/components/login-button";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/redux/slices/userApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/persist";
// import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.startsWith("/teacher");
	const isCoursePage = pathname?.includes("/courses");
	const isSearchPage = pathname === "/";
	// const user = null;
	// const role = null;
	const user = useSelector((state) => state.auth.userData);
	// const user = useAppSelector((state) => state.auth.userData);
	const role = useSelector((state) => state.auth.role);
	const dispatch = useDispatch();
	// const [Userlogout] = useLogoutMutation();
	const handleLogout = async () => {
		try {
			const data = await Userlogout();
			console.log(data);
			dispatch(logout());
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}

			<div className="flex gap-x-2 ml-auto">
				{user && user != null ? (
					<Button
						variant="destructive"
						onClick={handleLogout}
					>
						Logout
					</Button>
				) : (
					<div className="space-x-4">
						<Link href="/login">
							<Button variant="outline">Login</Button>
						</Link>
						<Link href="/signup">
							<Button>Sign Up</Button>
						</Link>
					</div>
				)}
				{role === "CREATOR" && (
					<Link href="/creator/create">
						<Button variant="secondary">Creator</Button>
					</Link>
				)}
				{/* {isTeacherPage || isCoursePage ? (
					<Link href="/">
						<Button
							size="sm"
							variant="ghost"
						>
							<LogOut className="h-4 w-4 mr-2" />
							Exit
						</Button>
					</Link>
				) : isTeacher(userId) ? (
					<Link href="/teacher/courses">
						<Button
							size="sm"
							variant="ghost"
						>
							Teacher mode
						</Button>
					</Link>
				) : null} */}
				{/* <UserButton afterSignOutUrl="/" /> */}
				{/* <LoginButton /> */}
			</div>
		</>
	);
};

export default NavbarRoutes;
