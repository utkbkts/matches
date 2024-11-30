import { useState } from "react";
import { Link } from "react-router-dom"; // Eğer Link'i kullanıyorsanız import edin
import ListCard from "./partials/ListCard";
import { useGetMemberByIdQuery } from "@/store/api/member-api";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";

const ListPage = () => {
  const [active, setActive] = useState<number | null>(1);
  const { data, isLoading } = useGetMemberByIdQuery(null);
  const { user } = useAppSelector((state) => state.auth);
  const toggleHandler = (id: number) => {
    setActive(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Link
        className="flex items-center justify-center flex-col h-screen"
        to={`/`}
      >
        <Button>Please log in to view this page.</Button>
      </Link>
    );
  }

  const myFavorite = data?.user?.myFavorite || [];
  const liked = data?.user?.liked || [];

  const membersToDisplay = active === 1 ? myFavorite : liked;

  return (
    <div className="py-4 px-4 container mx-auto">
      <div className="bg-gray-200 flex items-center">
        <div className="p-2 rounded-md">
          <button
            onClick={() => toggleHandler(1)}
            className={`${
              active === 1 ? "bg-white p-1 rounded-md" : " p-1"
            } transition-all duration-300`}
          >
            Members I have liked
          </button>
        </div>
        <div className="p-2 rounded-md">
          <button
            onClick={() => toggleHandler(2)}
            className={`${
              active === 2 ? "bg-white p-1 rounded-md" : " p-1"
            } transition-all duration-300`}
          >
            Members that like me
          </button>
        </div>
      </div>

      <div className="xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {membersToDisplay.length > 0 ? (
          membersToDisplay.map((user: any) => (
            <ListCard key={user._id} user={user} />
          ))
        ) : (
          <div className="flex items-center flex-col justify-center h-[80vh]">
            <Link to={"/matches"}>
              <Button className="bg-blue-600 hover:bg-blue-500">
                {active === 1
                  ? "There is no one you like right now."
                  : "No one has liked you yet."}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;
