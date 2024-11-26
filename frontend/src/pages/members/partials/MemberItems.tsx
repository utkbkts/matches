import calculateAge from "@/helpers/date-format";
import { MembersType } from "@/types/types";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const MemberItems = ({ member }: { member: MembersType }) => {
  console.log("🚀 ~ MemberItems ~ member:", member);
  return (
    <div className="rounded-2xl relative border border-gray-200 mt-4 bg-gradient-to-t w-[400px] cursor-pointer hover:scale-110 transition-all duration-500">
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-black/0 to-black/70 z-10"></div>
      <div className="p-4 flex items-center justify-center">
        <Link
          to={`/members/details/${member._id}/profile`}
          className="flex flex-col"
        >
          <img
            src={member.picture?.url}
            alt={member.name}
            title={member.gender}
            className="object-cover w-[250px] h-[250px] rounded-full"
          />
          <div className="text-white relative z-50">
            <h2 className="text-lg font-semibold ">
              {member.name},{calculateAge(member?.birthday as string)}
            </h2>
            <p className="text-sm">{member.country}</p>
          </div>
        </Link>
        <div className="absolute top-2 right-2">
          <Heart className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MemberItems;
