import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { headerMenu } from "./HeaderLinks";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MobileMenu = () => {
  const pathname = useLocation().pathname;
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
  };
  return (
    <Sheet open={active} onOpenChange={handleClick}>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>
            {" "}
            <Link to={"/"} className="text-2xl relative font-bold text-black">
              <span className="absolute -left-3 -top-1 -rotate-12">
                <Heart />
              </span>
              Let's match
            </Link>
          </SheetTitle>
          <SheetDescription>
            <div>
              <ul className="flex items-center flex-col gap-4 text-black text-xl">
                {headerMenu.map((item) => (
                  <li
                    onClick={handleClick}
                    key={item.id}
                    className={cn(
                      "hover:text-blue-200 transition-all border-b  duration-300",
                      pathname === item.href
                        ? "border-b border-b-white"
                        : "border-b-transparent"
                    )}
                  >
                    <Link to={item.href}>{item.title}</Link>
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

export default MobileMenu;
