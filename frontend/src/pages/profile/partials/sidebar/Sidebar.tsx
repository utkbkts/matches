import { Separator } from "@/components/ui/separator";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
  return (
    <div className="h-[80vh] p-8">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/f1.jpg"
          alt=""
          className="w-32 h-32 rounded-full object-cover"
        />
        <span>Utku Bektasoglu</span>
        <span>utku@gmail.com</span>
      </div>
      <Separator />
      <div>
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
