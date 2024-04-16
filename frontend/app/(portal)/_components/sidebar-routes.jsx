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
const creatorRoutes = [
	{
		icon: List,
		label: "Courses",
		href: "/creator/courses",
	},
	{
		icon: BarChart,
		label: "Analytics",
		href: "/creator/analytics",
	},
];
const SidebarRoutes = () => {
	const pathname = usePathname();
	const user = useSelector((state) => state.persistedReducer.auth.userData);
	// const routes = user != null ? protectedRoutes : guestRoutes;
	const isCreatorPage = pathname?.includes("/creator");

	const routes = isCreatorPage ? creatorRoutes : protectedRoutes;
	return (
		<div className="flex flex-col w-full">
			{user != null
				? routes.map((route) => (
						<SidebarItem
							key={route.href}
							icon={route.icon}
							label={route.label}
							href={route.href}
						/>
				  ))
				: guestRoutes.map((route) => (
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
