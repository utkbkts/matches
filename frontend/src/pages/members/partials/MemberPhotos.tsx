import { Separator } from "@/components/ui/separator";

const MemberPhotos = () => {
  return (
    <div>
      <h1 className="text-muted-foreground">Photos</h1>
      <Separator />
      <div className="flex flex-wrap gap-4 mt-4">
        <img
          src=""
          className="border border-blue-400 w-32 h-32 rounded-full"
          alt="image-card-avatar"
          title="image-female-male"
        />
        <img
          src=""
          className="border border-blue-400 w-32 h-32 rounded-full"
          alt="image-card-avatar"
          title="image-female-male"
        />
        <img
          src=""
          className="border border-blue-400 w-32 h-32 rounded-full"
          alt="image-card-avatar"
          title="image-female-male"
        />
      </div>
    </div>
  );
};

export default MemberPhotos;
