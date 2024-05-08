"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
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
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isCreatorpage = pathname?.includes("/creator");

  const routes = isCreatorpage ? creatorRoutes : guestRoutes;

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
  )
}