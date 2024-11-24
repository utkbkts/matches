import { useGetAllMembersQuery } from "@/store/api/member-api";
import MemberItems from "./partials/MemberItems";
import { MembersType } from "@/types/types";

const Members = () => {
  const { data } = useGetAllMembersQuery(null);
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 container mx-auto place-items-center">
        {data?.users?.map((member: MembersType) => (
          <MemberItems key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
