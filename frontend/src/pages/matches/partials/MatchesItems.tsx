import calculateAge from "@/helpers/date-format";
import { getErrorMessage } from "@/helpers/error-message";
import { useLikedMutation } from "@/store/api/user-api";
import { MembersType } from "@/types/types";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MatchesItems = ({
  member,
  liked,
}: {
  member: MembersType;
  liked: any;
}) => {
  const [likedMutation, { isSuccess, isError, error, data }] =
    useLikedMutation();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
    }

    if (isError) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  }, [isSuccess, data, isError, error]);

  const handleClick = async (id: any) => {
    try {
      await likedMutation({ id });
    } catch (error) {
      console.error("Error while liking:", error);
    }
  };

  return (
    <div className="rounded-2xl relative border border-gray-200 mt-4 bg-gradient-to-t w-[400px] cursor-pointer">
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-black/0 to-black/70 z-10"></div>

      <div className="p-4 flex items-center justify-center">
        <Link
          to={`/members/details/${member._id}/profile`}
          className="flex flex-col"
        >
          <img
            src={member.picture.url}
            alt={member.name}
            title={member.gender}
            className="object-cover w-[250px] h-[250px] rounded-full"
          />
          <div className="text-white relative z-50">
            <h2 className="text-lg font-semibold">
              {member.name}, {calculateAge(member?.birthday)}
            </h2>
            <div className="flex items-center gap-1">
              <p className="text-sm">{member.country}</p>-
              <p className="text-sm">{member.city}</p>
            </div>
          </div>
        </Link>
        <div
          onClick={() => handleClick(member._id)}
          className="absolute top-2 right-2"
        >
          <Heart
            className="cursor-pointer"
            stroke={liked ? "red" : "currentColor"}
            fill={liked ? "red" : "none"}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchesItems;
