import { Separator } from "@/components/ui/separator";
import EditProfileInput from "@/components/editProfile/EditProfileInput";
import { Form } from "@/components/ui/form";
import { EditFormData, editProfileSchema } from "@/schema/edit-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MemberProfile = () => {
  const form = useForm<EditFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      city: "",
      country: "",
      description: "",
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: EditFormData) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-muted-foreground">Profile</h1>
      <Separator />
      <div className="mt-12 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <EditProfileInput
              label="Name"
              name="name"
              placeholder="Enter your name"
              control={form.control}
              error={form.formState.errors.name}
            />
            <EditProfileInput
              label="City"
              name="city"
              placeholder="Enter your city"
              control={form.control}
              error={form.formState.errors.city}
            />
            <EditProfileInput
              label="Country"
              name="country"
              placeholder="Enter your country"
              control={form.control}
              error={form.formState.errors.country}
            />
            <EditProfileInput
              label="Description"
              name="description"
              placeholder="Enter a brief description"
              control={form.control}
              error={form.formState.errors.description}
              multiline
            />
            <button
              type="submit"
              className="mt-4 flex items-center justify-center w-full px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
            >
              Save
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MemberProfile;
