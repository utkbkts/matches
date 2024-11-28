import { dateHandler } from "@/helpers/date-format";
import { Link } from "react-router-dom";

const ChatNotification = ({ msg }: any) => {
  console.log("🚀 ~ ChatNotification ~ msg:", msg);

  return (
    <div className="flex flex-col p-4">
      <div className="">
        <table className="table-fixed overflow-scroll w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Sender</th>
              <th className="px-4 py-2 text-left font-semibold">Message</th>
              <th className="px-4 py-2 text-left font-semibold">
                Date Received
              </th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-6 flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute bg-green-400 h-4 w-4 rounded-full right-0 top-0"></span>
                  <img
                    src={msg?.senderId?.picture?.url}
                    className="w-12 h-12 rounded-full"
                    alt="user"
                  />
                </div>
                <p>{msg?.senderId?.name}</p>
              </td>
              <td className="px-5 py-2 ">{msg?.message}</td>
              <td className="px-4 py-2">{dateHandler(msg?.createdAt)}</td>
              <td className="px-4 py-2 ">
                <Link
                  to={`/members/details/${msg?.receiverId?._id}/profile/chat`}
                >
                  <button className="bg-blue-500 text-white py-1 px-3 rounded-md">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChatNotification;
