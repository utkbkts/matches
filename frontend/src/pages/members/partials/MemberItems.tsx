import calculateAge from "@/helpers/dateFormat";
import { MembersType } from "@/types/types";
import { Link } from "react-router-dom";

const MemberItems = ({ member }: { member: MembersType }) => {
  return (
    <div className="rounded-2xl relative border border-gray-200 mt-4 bg-gradient-to-t w-[400px] cursor-pointer">
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-black/0 to-black/70 z-10"></div>

      <Link
        to={`/members/details/${member.id}/profile`}
        className="p-4 flex items-center justify-center"
      >
        <div className="flex flex-col">
          <img
            src={member.image}
            alt={member.name}
            title={member.gender}
            className="object-cover w-[250px] h-[250px] rounded-full"
          />
          <div className="text-white relative z-50">
            <h2 className="text-lg font-semibold ">
              {member.name},{calculateAge(member.dateOfBirth)}
            </h2>
            <p className="text-sm">{member.country}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MemberItems;
