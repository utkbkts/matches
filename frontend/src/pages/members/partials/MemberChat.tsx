import { Separator } from "@/components/ui/separator";

const messages = [
  {
    id: 1,
    name: "Mayo Willison",
    message: "Hi Mayo! I'm excited to chat with you.",
    time: "22 ocb 24 6:06PM",
    isUser: true,
  },
  {
    id: 2,
    name: "Mayo Willison",
    message: "Hi Mayo! I'm excited to chat with you.",
    time: "22 ocb 24 6:06PM",
    isUser: false,
  },
];

interface Props {
  name: string;
  message: string;
  time: string;
  isUser: boolean;
}

const Message = ({ name, message, time, isUser }: Props) => (
  <div
    className={`w-full flex items-center ${
      isUser ? "justify-end" : "justify-start"
    }`}
  >
    <div className="w-[300px] mt-4">
      <div
        className={`${
          isUser ? "bg-blue-400" : "bg-green-400"
        } p-2 text-black flex flex-col rounded-md`}
      >
        <span className="flex items-center gap-4 font-bold">
          {name}
          <span
            className={`${
              isUser ? "text-gray-200" : "text-gray-800"
            } font-normal`}
          >
            {time}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{message}</p>
          <img
            src="/images/user.png"
            alt="user-image"
            title="image-chat"
            className="w-12 h-12 rounded-full"
          />
        </div>
      </div>
    </div>
  </div>
);

const MemberChat = () => {
  return (
    <div className="flex-grow flex flex-col h-full p-4">
      <h1 className="text-muted-foreground mb-2">Chat</h1>
      <Separator />

      <div className="flex-grow overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <>
            <Message
              key={msg.id}
              name={msg.name}
              message={msg.message}
              time={msg.time}
              isUser={msg.isUser}
            />
          </>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-2 mt-4 p-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 text-gray-800 rounded-md border border-gray-400 outline-none"
        />
        <button className="p-2 bg-green-500 text-white rounded-md text-sm font-semibold">
          Send
        </button>
      </div>
    </div>
  );
};

export default MemberChat;
