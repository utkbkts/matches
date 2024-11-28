import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderLinks from "./partials/HeaderLinks";
import UserMenu from "./partials/UserMenu";
import MobileMenu from "./partials/MobileMenu";

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 h-16">
      <div className="h-full flex items-center justify-between container mx-auto relative">
        <Link to={"/"} className="text-2xl relative font-bold text-white">
          <span className="absolute -left-3 -top-1 -rotate-12">
            <Heart />
          </span>
          Let's match
        </Link>
        <div className="md:flex hidden">
          <HeaderLinks />
        </div>
        <div>
          <UserMenu />
        </div>
        <div className="md:hidden block absolute right-0 top-5">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
