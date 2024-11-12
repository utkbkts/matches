import { useState } from "react";
import ListCard from "./partials/ListCard";

const ListPage = () => {
  const [active, setActive] = useState<number | null>(1);

  const toggleHandler = (id: number) => {
    setActive(id);
  };

  return (
    <div className="py-4 px-4 container mx-auto">
      <div className="bg-gray-200 flex items-center">
        <div className="p-2 rounded-md">
          <button
            onClick={() => toggleHandler(1)}
            className={` ${
              active === 1 ? "bg-white p-1 rounded-md" : " p-1"
            } transition-all duration-300`}
          >
            Members I have liked
          </button>
        </div>
        <div className="p-2 rounded-md">
          <button
            onClick={() => toggleHandler(2)}
            className={` ${
              active === 2 ? "bg-white p-1 rounded-md" : " p-1"
            } transition-all duration-300`}
          >
            Members that like me
          </button>
        </div>
        <div className="p-2 rounded-md">
          <button
            onClick={() => toggleHandler(3)}
            className={` ${
              active === 3 ? "bg-white p-1 rounded-md" : " p-1"
            } transition-all duration-300`}
          >
            Mutual likes
          </button>
        </div>
      </div>
      <div className="xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <ListCard />
      </div>
    </div>
  );
};

export default ListPage;
