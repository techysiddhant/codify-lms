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

export const NavbarRoutes = () => {
	const { data } = useSession();
	const pathname = usePathname();
	const isCreatorPage = pathname?.startsWith("/creator");
	const isCoursePage = pathname?.includes("/courses");
	const isSearchPage = pathname === "/";
	// console.log(data);
	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
			
			<div className="flex gap-x-2 ml-auto">
				{data?.user ? <UserMenu data={data.user} /> : <LoginButton />}
				{isCoursePage || isCreatorPage ? (
					<Link href="/">
						<Button
							size="sm"
							variant="ghost"
						>
							<LogOut className="h-4 w-4 mr-2" />
							Exit
						</Button>
					</Link>
				) : data?.user?.role === "CREATOR" ? (
					<Link href="/creator/courses">
						<Button
							size="sm"
							variant="ghost"
						>
							Creator mode
						</Button>
					</Link>
				) : null}
				{/* {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : true ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null} */}
				{/* <UserButton
          afterSignOutUrl="/"
        /> */}
					<ModeToggle />

			</div>
		</>
	);
};
