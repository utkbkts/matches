import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col">
        <div>
          <Header />
        </div>
        <div className="flex-grow min-h-screen w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayouts;
