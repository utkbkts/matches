import useGetSocketMessage from "@/hooks/useGetSocketMessage";
import { useAppSelector } from "@/store/hooks";

const Sidebar = () => {
  const { messages } = useAppSelector((state) => state.message);
  useGetSocketMessage();

  return (
    <div className="p-2">
      <div>
        <span className="flex items-center gap-2 text-muted-foreground">
          Inbox
          <span className="rounded-full flex items-center justify-center font-bold text-xl w-6 h-6 text-white bg-gray-400">
            {messages.length}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
