import { Link, useLocation, useParams } from "react-router-dom";
import { membersData } from "../Members";
import calculateAge from "@/helpers/dateFormat";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const { id } = useParams();
  const location = useLocation();
  const member = membersData.find((member) => member.id === parseInt(id));
  const basePath = `/members/details/${id}`;
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
    <div className="w-full mt-10 items-center h-[80vh] shadow-xl">
      <div className="p-4 flex flex-col h-full">
        <img
          src={member?.image}
          alt={member?.name}
          title={member?.gender}
          height={200}
          width={200}
          className="rounded-full mt-6 aspect-square object-cover"
        />
        <div className="flex flex-col justify-between flex-grow">
          <div className="flex gap-2">
            <h1 className="text-xl">
              {member?.name}, {calculateAge(member?.dateOfBirth)}
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
          <div className="mt-auto w-full">
            <Button className="w-full" variant={"outline"}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
