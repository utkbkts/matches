import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderLinks from "./partials/HeaderLinks";
import UserMenu from "./partials/UserMenu";

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 h-16">
      <div className="h-full flex items-center justify-between container mx-auto">
        <Link to={"/"} className="text-2xl relative font-bold text-white">
          <span className="absolute -left-3 -top-1 -rotate-12">
            <Heart />
          </span>
          Let's match
        </Link>
        <div>
          <HeaderLinks />
        </div>
        <div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
