
import { MobileSidebar } from "./mobile-sidebar"
import { NavbarRoutes } from "./navbar-routes"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center  shadow-sm bg-primary-foreground">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}