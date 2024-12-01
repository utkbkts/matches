import { useSocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import { toast } from "sonner";

const useGetSocketNotifications = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("notification", (data) => {
      const message = data.message;
      toast.success(`${message} ~~~ New Message`);
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);
};
export default useGetSocketNotifications;
