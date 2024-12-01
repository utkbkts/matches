import { useMemberAllQuery } from "@/store/api/member-api";
import MemberItems from "./partials/MemberItems";
import { MembersType } from "@/types/types";
import { useAppSelector } from "@/store/hooks";
import { useSocketContext } from "@/context/SocketContext";

const Members = () => {
  const { data } = useMemberAllQuery({});
  const { onlineUsers } = useSocketContext();
  const { user } = useAppSelector((state) => state.auth);

  const uniqueUser = data?.members?.filter(
    (item: MembersType) => item._id !== user?._id
  );
  //filtered me user
  const favoriteUserIds = user?.myFavorite?.map((item: any) => item.user);

  const filtered = uniqueUser?.filter((item: any) =>
    favoriteUserIds?.includes(item._id)
  );
  console.log("🚀 ~ Members ~ filtered:", filtered);
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto pt-12">
        <h1 className="font-semibold text-xl">
          Total number of members ({uniqueUser?.length})
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 container mx-auto place-items-center">
          {uniqueUser?.map((member: MembersType) => {
            const isOnline = onlineUsers?.onlineUsers?.some(
              (onlineUser: any) => onlineUser._id === member._id
            );
            const isLiked = filtered?.some(
              (item: any) => item._id === member._id
            );
            return (
              <div
                key={member._id}
                className="relative flex items-center justify-center gap-4 bg-white p-4 rounded-lg shadow-md w-full"
              >
                {/* Online Durum İkonu */}
                {isOnline && (
                  <div className="bg-green-500 absolute rounded-full h-8 w-8 top-12 lg:left-10  md:left-32 left-10"></div>
                )}

                {/* Member İçeriği */}
                <MemberItems member={member} isLiked={isLiked} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Members;
