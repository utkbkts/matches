import { useMemberAllQuery } from "@/store/api/member-api";
import MemberItems from "./partials/MemberItems";
import { MembersType } from "@/types/types";

const Members = () => {
  const { data } = useMemberAllQuery({});
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto pt-12">
        <h1 className="font-semibold text-xl">
          Total number of members ({data?.members?.length})
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 container mx-auto place-items-center">
          {data?.members?.map((member: MembersType) => (
            <MemberItems key={member._id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
