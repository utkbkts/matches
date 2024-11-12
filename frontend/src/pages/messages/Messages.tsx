import ChatNotification from "./partials/ChatNotification";
import Sidebar from "./partials/Sidebar";

const Messages = () => {
  return (
    <div className="py-6 px-4">
      <div className="grid grid-cols-12 gap-5 h-[80vh]">
        <div className="col-span-2 w-full mt-10 items-center h-[80vh] shadow-xl">
          <Sidebar />
        </div>
        <div className="w-full mt-10 items-center h-[80vh] shadow-xl p-4 col-span-10">
          <ChatNotification />
        </div>
      </div>
    </div>
  );
};

export default Messages;
