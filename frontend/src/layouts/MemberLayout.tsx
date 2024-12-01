import MobileSidebar from "@/pages/members/sidebar/MobileSidebar";
import Sidebar from "@/pages/members/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MemberLayout = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-5 h-[80vh]">
        <div className="col-span-3 md:block hidden w-full mt-10 items-center h-[80vh] shadow-xl">
          <Sidebar />
        </div>
        <div className="md:hidden block">
          <MobileSidebar />
        </div>
        <div className="w-full mt-10 items-center h-[80vh] shadow-xl p-4 md:col-span-9 col-span-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLayout;
