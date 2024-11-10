import Sidebar from "@/pages/members/partials/Sidebar";
import { Outlet } from "react-router-dom";

const MemberLayout = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-5 h-[80vh]">
        <div className="col-span-3 w-full mt-10 items-center h-[80vh] shadow-xl">
          <Sidebar />
        </div>
        <div className="w-full mt-10 items-center h-[80vh] shadow-xl p-4 col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLayout;
