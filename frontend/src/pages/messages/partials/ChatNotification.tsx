const ChatNotification = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="">
        <table className="table-auto overflow-scroll w-full bg-white border border-gray-200 rounded-lg shadow-md">
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
                    src="/images/user.png"
                    className="w-12 h-12 rounded-full"
                    alt="user"
                  />
                </div>
                <p>John Doe</p>
              </td>
              <td className="px-4 py-2">
                Hi there! How are you doing? I'm looking forward to our chat.
              </td>
              <td className="px-4 py-2">2022-01-25 10:30 AM</td>
              <td className="px-4 py-6 flex space-x-2">
                <button className="bg-blue-500 text-white py-1 px-3 rounded-md">
                  View
                </button>
                <button className="bg-gray-400 text-white py-1 px-3 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChatNotification;
