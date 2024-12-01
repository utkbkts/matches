import { Separator } from "@/components/ui/separator";
import SidebarLinks from "./SidebarLinks";
import { useGetUserQuery } from "@/store/api/user-api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { data } = useGetUserQuery("");
  return (
    <div className="h-[80vh] p-8">
      <div className="flex flex-col items-center justify-center">
        <img
          src={data?.picture?.url}
          alt=""
          className="w-32 h-32 rounded-full object-cover"
        />
        <span>{data?.name}</span>
        <span>{data?.email}</span>
        <p className="text-center text-muted-foreground">{data?.status}</p>
      </div>
      <Separator />
      <div className="flex flex-col justify-between h-full">
        <SidebarLinks />
        <Link to={"/members"} className="">
          <Button className="w-full" variant={"outline"}>
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
