"use client";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { LoginButton } from "./login-button";
import { useSession } from "next-auth/react";
import { UserMenu } from "./user-menu";
// import SearchInput from "./search-input";
// import LoginButton from "@/components/login-button";
// import { useSelector } from "react-redux";
// import { useLogoutMutation } from "@/redux/slices/userApiSlice";
// import { useDispatch } from "react-redux";
// import { logout } from "@/redux/slices/authSlice";
// import { useAppSelector } from "@/redux/persist";
// import { isTeacher } from "@/lib/teacher";
export const NavbarRoutes = () => {
  const {data} = useSession();
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    // console.log(data);
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2 ml-auto">
        {
          data?.user ? <UserMenu data={data.user} /> : <LoginButton />
        }
        
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
      </div>
    </>
  )
}
