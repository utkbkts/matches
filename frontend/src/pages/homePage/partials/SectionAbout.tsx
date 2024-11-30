import { Button } from "@/components/ui/button";
import img1 from "/slider/map-bg-1.png";
import { useSocketContext } from "@/context/SocketContext";
import img2 from "/status_01.png";
import img3 from "/status_02.png";
import img4 from "/status_03.png";
import img5 from "/status_04.png";
import { useMemberAllQuery } from "@/store/api/member-api";

const SectionAbout = () => {
  const { onlineUsers } = useSocketContext();
  const { data } = useMemberAllQuery({});

  return (
    <div className="mt-24 relative">
      <div className="absolute -z-10  left-44">
        <img src={img1} alt="bg-image" title="background" />
      </div>
      <div className="flex flex-col gap-4 items-center pt-8 text-center">
        <h1 className="font-bold text-[40px]  ">
          It all starts with a <span className="text-red-500">Date</span>{" "}
        </h1>
        <p className="text-muted-foreground text-center md:w-[750px] w-full">
          You find us, finally, and you are already in love. More than 5.000.000
          around the world already shared the same experience and uses our
          system. Joining us today just got easier!
        </p>
        <div className="flex gap-4">
          <Button className="bg-red hover:bg-red-foreground">
            join us for Free
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600">
            Watch the promotional video
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1">
        <div className="flex flex-col items-center justify-center">
          <img src={img2} alt="status-image" title={"status-online"} />
          <h2 className="text-center font-bold text-[24px]">
            {data?.members?.length}
          </h2>
          <p className="text-muted-foreground text-center">Members in total</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={img3} alt="status-image" title={"status-online"} />
          <h2 className="text-center font-bold text-[24px]">
            {" "}
            {onlineUsers?.total}
          </h2>
          <p className="text-muted-foreground text-center">Online Total</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={img4} alt="status-image" title={"status-online"} />
          <h2 className="text-center font-bold text-[24px]">
            {" "}
            {onlineUsers?.female}
          </h2>
          <p className="text-muted-foreground text-center">Online women</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={img5} alt="status-image" title={"status-online"} />
          <h2 className="text-center font-bold text-[24px]">
            {onlineUsers?.male}
          </h2>
          <p className="text-muted-foreground text-center">Online men</p>
        </div>
      </div>
    </div>
  );
};

export default SectionAbout;
