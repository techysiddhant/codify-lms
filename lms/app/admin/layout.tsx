import { Navbar } from "../(portal)/_components/navbar";

const AdminLayout = ({children}:{children: React.ReactNode;}) => {
  return (
    <div className="h-full">
      <Navbar />
      {/* <main className="md:pl-80 pt-[80px] h-full">{children}</main> */}
      <main className="min-h-full h-full">{children}</main>
    </div>
  )
}

export default AdminLayout