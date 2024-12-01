import Sidebar from "@/pages/profile/partials/sidebar/Sidebar";
import MobileSidebar from "@/pages/profile/partials/sidebar/SidebarMobile";
import { Outlet } from "react-router-dom";

const UserLayouts = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-5 h-full">
        <div className="col-span-3 w-full mt-10 items-center h-full shadow-xl md:block hidden">
          <Sidebar />
        </div>
        <div className="md:hidden block">
          <MobileSidebar />
        </div>
        <div className="w-full mt-10 items-center h-full shadow-xl p-4 col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayouts;
