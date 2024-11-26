import { Separator } from "@/components/ui/separator";
import { useUserByIdQuery } from "@/store/api/member-api";
import { useParams } from "react-router-dom";

const MemberProfile = () => {
  const { id } = useParams();
  const { data } = useUserByIdQuery(id);
  return (
    <div>
      <h1 className="text-muted-foreground">Profile</h1>
      <Separator />
      <div className="mt-12 w-full">
        <form className="flex flex-col gap-2">
          <h1>Name</h1>
          <span>{data?.user?.name}</span>
          <h1>Description</h1>
          <p>{data?.user?.status}</p>
          <div className="flex gap-2">
            <div className="flex-1">
              <h1>City</h1>
              <span>{data?.user?.city}</span>
            </div>
            <div className="flex-1">
              <h1>Country</h1>
              <span>{data?.user?.country}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberProfile;
