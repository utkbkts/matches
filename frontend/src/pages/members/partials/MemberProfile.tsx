import { Separator } from "@/components/ui/separator";

const MemberProfile = () => {
  return (
    <div>
      <h1 className="text-muted-foreground">Profile</h1>
      <Separator />
      <div className="mt-12 w-full">
        <form className="flex flex-col gap-2">
          <h1>Name</h1>
          <span>Emilia Clark</span>
          <h1>Description</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            magni, rerum maxime error aliquam vero nostrum a, libero dolores
            unde nam eum, ipsa ipsum quidem repellendus? Eligendi officiis
            itaque ipsam tempore libero adipisci fugiat natus impedit,
            voluptatem commodi? Natus, aspernatur!
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <h1>City</h1>
              <span>İstanbul</span>
            </div>
            <div className="flex-1">
              <h1>Country</h1>
              <span>Türkiye</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberProfile;
