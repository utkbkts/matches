import { useSocketContext } from "@/context/SocketContext";
import { setMessages } from "@/store/features/message-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) {
      return 
    }
    socket.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages]);
};
export default useGetSocketMessage;