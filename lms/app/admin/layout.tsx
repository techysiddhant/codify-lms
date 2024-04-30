import { Navbar } from "../(portal)/_components/navbar";

const AdminLayout = ({children}:{children: React.ReactNode;}) => {
  return (
    <div className="h-full">
      <Navbar />
    </div>
  )
}

export default AdminLayout