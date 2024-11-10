import Sidebar from "@/pages/members/partials/Sidebar";
import { Outlet } from "react-router-dom";

const MemberLayout = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-5 h-[80vh]">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLayout;
