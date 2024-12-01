import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Heart, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const MobileSidebar = () => {
  const pathname = useLocation().pathname;
  const { id } = useParams();
  const [active, setActive] = useState(false);
  const basePath = `/members/details/${id}`;

  const handleClick = () => {
    setActive((prev) => !prev);
  };
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
    <Sheet open={active} onOpenChange={handleClick}>
      <SheetTrigger>
        <Menu className="text-black" />
      </SheetTrigger>
      <SheetContent className="!w-[300px] bg-gradient-to-b bg-white text-black p-6 shadow-xl rounded-lg">
        <SheetHeader>
          <SheetTitle>
            <Link
              to="/"
              className="text-3xl relative text-center  font-bold bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] bg-clip-text text-transparent h-12 flex items-center"
            >
              <span className="absolute -left-4 -top-2 animate-bounce">
                <Heart className="text-red-500" />
              </span>
              Let's Match
            </Link>
          </SheetTitle>
          <SheetDescription>
            <div>
              <ul className="flex flex-col items-start gap-4 mt-6">
                {navLinks.map((item: any) => (
                  <li
                    onClick={handleClick}
                    key={item.id}
                    className={cn(
                      "text-lg font-medium hover:text-yellow-400 transition-all duration-300 hover:scale-105 hover:border-l-4 hover:border-yellow-400 pl-2",
                      pathname === item.url
                        ? "text-yellow-400 border-l-4 border-yellow-400"
                        : "border-l-4 border-transparent"
                    )}
                  >
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
