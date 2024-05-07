"use client";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { LoginButton } from "./login-button";
import { useSession } from "next-auth/react";
import { UserMenu } from "./user-menu";
import { ModeToggle } from "@/components/theme-toggle";
import { CustomUser } from "@/app/api/auth/[...nextauth]/route";

export const NavbarRoutes = () => {
	const { data } = useSession();
	const user: CustomUser | null | undefined = data?.user;
	const pathname = usePathname();
	const isCreatorPage = pathname?.startsWith("/creator");
	const isCoursePage =
		pathname?.includes("/courses") || pathname?.includes("/course");
	const isSearchPage = pathname === "/";
	const isAdmin = user?.role === "ADMIN";
	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}

			<div className="flex gap-x-2 ml-auto">
				{isCoursePage || isCreatorPage ? (
					<Link href="/">
						<Button variant="ghost">
							<LogOut className="h-4 w-4 mr-2" />
							Exit
						</Button>
					</Link>
				) : user?.role === "CREATOR" ? (
					<Link href="/creator/courses">
						<Button variant="outline">Creator mode</Button>
					</Link>
				) : isAdmin ? (
					<Link href="/admin">
						<Button variant="outline">Admin</Button>
					</Link>
				) : null}
				{data?.user ? <UserMenu data={data.user} /> : <LoginButton />}

				<ModeToggle />
			</div>
		</>
	);
};
