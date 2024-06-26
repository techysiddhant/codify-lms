import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
	return (
		<div className="h-full border-r flex flex-col overflow-y-auto bg-primary-foreground  shadow-sm">
			<div className="p-4">
				<Logo />
			</div>
			<div className="flex flex-col w-full -mt-1">
				<SidebarRoutes />
			</div>
		</div>
	);
};
