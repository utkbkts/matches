import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const headerMenu = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Matches",
    href: "/matches",
  },
  {
    id: 3,
    title: "Lists",
    href: "/lists",
  },
  {
    id: 4,
    title: "Messages",
    href: "/messages",
  },
  {
    id: 5,
    title: "Members",
    href: "/members",
  },
];

const HeaderLinks = () => {
  const pathname = useLocation().pathname;
  return (
    <ul className="flex items-center gap-4 text-white">
      {headerMenu.map((item) => (
        <li
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
  );
};

export default HeaderLinks;
