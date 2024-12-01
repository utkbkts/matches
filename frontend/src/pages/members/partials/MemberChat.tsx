import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { dateHandler } from "@/helpers/date-format";
import { getErrorMessage } from "@/helpers/error-message";
import useGetSocketMessage from "@/hooks/useGetSocketMessage";
import {
  createMessagedata,
  createMessageSchema,
} from "@/schema/create-message-schema";
import {
  useGetMessageQuery,
  useSendMessageMutation,
} from "@/store/api/messages-api";
import { setMessages } from "@/store/features/message-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const messagesData = [
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
  avatarReceiverId?: string;
}

const Message = ({ name, message, time, isUser, avatarReceiverId }: Props) => (
  <div
    className={`w-full flex items-center ${
      isUser ? "justify-end" : "justify-start"
    }`}
  >
    <div className="w-[300px] mt-4">
      <div
        className={`${
          isUser ? "bg-blue-400" : "bg-green-400"
        } p-2 text-black flex flex-col rounded-md relative`}
      >
        <span className="flex items-center gap-4 font-bold justify-between">
          {name}
          <span
            className={`absolute -bottom-6 right-0 text-gray-800 font-normal`}
          >
            {dateHandler(time)}
          </span>
        </span>
        <div className="flex items-start gap-2 justify-between">
          <p className="font-semibold text-center">{message}</p>
          <img
            src={avatarReceiverId}
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
  const { user } = useAppSelector((state) => state.auth);
  const { messages } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams();

  const [
    sendMutation,
    { isLoading, isSuccess, isError, error, data: sendData },
  ] = useSendMessageMutation();

  useGetSocketMessage();

  const { data } = useGetMessageQuery(id);
  const senderId = user?._id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createMessagedata>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      message: "",
    },
    mode: "onChange",
  });
  useEffect(() => {
    if (data) {
      dispatch(setMessages(data));
    }
  }, [data]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
    }
    if (isError) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  }, [isError, isSuccess, error]);

  const onSubmit = async (data: any) => {
    try {
      await sendMutation({ body: { ...data }, id });
      dispatch(setMessages([...messages, sendData]));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <>
      <div className="flex-grow flex flex-col h-full p-4 relative">
        {user?.currentSubscription === null || user === null ? (
          <>
            <div className="backdrop-blur-lg bg-gradient-to-r from-white/40 to-white/10 absolute left-0 top-0 w-full h-[80vh] flex items-center justify-center z-50">
              <div className="border border-gray-300 rounded-lg shadow-lg bg-white/70 h-[400px] w-[600px] p-8 flex flex-col items-center justify-center space-y-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center">
                  Buy the package to talk to the person you like now
                </h1>
                {!user ? (
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 hover:scale-105 cursor-not-allowed">
                    please login
                  </button>
                ) : (
                  <Link to={"/user-profile/package"}>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
                      Buy Package
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4">
              {messagesData?.map((msg) => (
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
          </>
        ) : (
          <>
            <h1 className="text-muted-foreground mb-2">Chat</h1>
            <Separator />
            <div className="flex-grow overflow-y-auto space-y-4">
              {messages.length > 0 &&
                messages?.map((msg: any, index: number) => {
                  return (
                    <div
                      key={msg?._id}
                      ref={
                        index === messages.length - 1 ? lastMessageRef : null
                      }
                    >
                      <Message
                        name={
                          msg?.senderId?._id === senderId
                            ? "You"
                            : msg?.senderId?.name
                        }
                        message={msg?.message}
                        time={msg?.createdAt}
                        isUser={msg?.senderId?._id === senderId}
                        avatarReceiverId={msg?.senderId?.picture?.url}
                      />
                    </div>
                  );
                })}
            </div>
            {/* Chat Input */}
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 w-full justify-between"
              >
                <div className="flex flex-col w-full relative">
                  <Input
                    placeholder="Type your message..."
                    type="text"
                    {...register("message")}
                    className="!flex-grow p-2 !space-y-0 text-gray-800 rounded-md border border-gray-400 outline-none !w-full"
                  />
                  {errors.message?.message && (
                    <span className="text-red-500 text-sm absolute -bottom-5">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  loading={isLoading}
                  className="p-2 bg-green-500 text-white rounded-md text-sm font-semibold"
                >
                  Send
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MemberChat;
