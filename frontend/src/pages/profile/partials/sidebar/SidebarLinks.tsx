import { Link, useLocation } from "react-router-dom";

const menuLinks = [
  { id: 1, title: "Dashboard", href: "/user-profile" },
  { id: 2, title: "Photo Update", href: "/user-profile/photos" },
  { id: 3, title: "Password Update", href: "/user-profile/password" },
  { id: 4, title: "Update Package", href: "/user-profile/package" },
];

const SidebarLinks = () => {
  const pathname = useLocation().pathname;

  return (
    <ul className="flex gap-2 flex-col mt-4">
      {menuLinks.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.id} className="relative">
            <Link
              to={item.href}
              className={`font-semibold cursor-pointer hover:text-gray-400 transition-all duration-300 relative ${
                isActive ? "text-black" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.title}
            </Link>
            {isActive && (
              <span className="w-full bg-black h-[1px] absolute bottom-0 left-0 transition-all duration-300"></span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarLinks;
