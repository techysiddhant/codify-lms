import { Logo } from "../(portal)/_components/logo";
import { Navbar } from "../(portal)/_components/navbar";
import { NavbarRoutes } from "../(portal)/_components/navbar-routes";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* <Navbar /> */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <Logo />
          <NavbarRoutes />
        </div>
      </div>
      {/* <main className="md:pl-80 pt-[80px] h-full">{children}</main> */}
      <main className="min-h-full h-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
