import { useAppSelector } from "@/store/hooks";
import ChatNotification from "./partials/ChatNotification";
import Sidebar from "./sidebar/Sidebar";
import useGetSocketMessage from "@/hooks/useGetSocketMessage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Messages = () => {
  const { messages } = useAppSelector((state) => state.message);
  const { user } = useAppSelector((state) => state.auth);
  useGetSocketMessage();

  const uniqueMessagesMap = new Map(
    messages
      .filter((item: any) => item.senderId._id !== user?._id)
      .map((item: any) => [item.senderId._id, item])
  );

  const uniqueMessages = Array.from(uniqueMessagesMap.values());

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

  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-12  gap-5 h-[80vh]">
        <div className="col-span-2 w-full mt-10 md:block hidden items-center h-[80vh] shadow-xl">
          <Sidebar />
        </div>
        <div className="w-full mt-10 items-center h-[80vh] shadow-xl p-4 md:col-span-10 col-span-full">
          {uniqueMessages.map((msg: any) => (
            <ChatNotification key={msg.senderId._id} msg={msg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
