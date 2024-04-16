"use client";

import SidebarItem from "./sidebar-item";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
const guestRoutes = [
	{
		icon: Compass,
		label: "Courses",
		href: "/",
	},
];
const protectedRoutes = [
	{
		icon: Compass,
		label: "Courses",
		href: "/",
	},
	{
		icon: Layout,
		label: "Dashboard",
		href: "/dashboard",
	},
];
const teacherRoutes = [
	{
		icon: List,
		label: "Courses",
		href: "/teacher/courses",
	},
	{
		icon: BarChart,
		label: "Analytics",
		href: "/teacher/analytics",
	},
];
const SidebarRoutes = () => {
	const pathname = usePathname();
	const user = useSelector((state) => state.auth.userData);
	const routes = user != null ? protectedRoutes : guestRoutes;
	// const isTeacherPage = pathname?.includes("/teacher");

	// const routes = isTeacherPage ? teacherRoutes : guestRoutes;
	return (
		<div className="flex flex-col w-full">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	);
};

export default SidebarRoutes;
