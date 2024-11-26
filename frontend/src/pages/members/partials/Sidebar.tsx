import { Link, useLocation, useParams } from "react-router-dom";
import calculateAge from "@/helpers/date-format";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useUserByIdQuery } from "@/store/api/member-api";

const Sidebar = () => {
  const { id } = useParams();
  const location = useLocation();
  const basePath = `/members/details/${id}`;
  const { data } = useUserByIdQuery(id);
  const navLinks = [
    {
      id: 1,
      name: "Profile",
      url: `${basePath}/profile`,
    },
    {
      id: 2,
      name: "Photos",
      url: `${basePath}/profile/photos`,
    },
    {
      id: 3,
      name: "Chat",
      url: `${basePath}/profile/chat`,
    },
  ];
  return (
    <div className="h-[80vh] ">
      <div className="flex p-2 flex-col h-full">
        <img
          src={data?.user?.picture?.url}
          alt={data?.user?.name}
          title={data?.user?.gender}
          height={200}
          width={200}
          className="rounded-full mt-6 aspect-square object-cover"
        />
        <div className="flex flex-col justify-between flex-grow">
          <div className="flex gap-2">
            <h1 className="text-xl">
              {data?.user?.name}, {calculateAge(data?.user?.birthday as any)}
            </h1>
          </div>
          <Separator />
          <ul className="flex flex-col gap-2 text-xl mt-4 flex-grow">
            {navLinks.map((link) => (
              <Link
                to={link.url}
                className={`cursor-pointer hover:text-black/50 ${
                  location.pathname === link.url
                    ? "text-black border-b border-b-black block"
                    : "text-gray-500 border-b-transparent border-b"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </ul>
          <Link to={"/members"} className="mt-auto w-full">
            <Button className="w-full" variant={"outline"}>
              Go Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
