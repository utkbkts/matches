import { useAppSelector } from "@/store/hooks";
import ChatNotification from "./partials/ChatNotification";
import Sidebar from "./partials/Sidebar";

const Messages = () => {
  const { messages } = useAppSelector((state) => state.message);
  console.log("🚀 ~ Messages ~ messages:", messages);
  const { user } = useAppSelector((state) => state.auth);
  const uniqueUserIds = Array.from(
    new Map(
      messages
        .filter((msg: any) => msg.receiverId._id !== user?._id)
        .map((msg: any) => [msg.receiverId._id, msg])
    ).values()
  );

  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-12 gap-5 h-[80vh]">
        <div className="col-span-2 w-full mt-10 items-center h-[80vh] shadow-xl">
          <Sidebar />
        </div>
        <div className="w-full mt-10 items-center h-[80vh] shadow-xl p-4 col-span-10">
          {uniqueUserIds.map((msg: any) => (
            <ChatNotification msg={msg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
