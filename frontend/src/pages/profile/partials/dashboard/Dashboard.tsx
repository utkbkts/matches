import EditProfileInput from "@/components/editProfile/EditProfileInput";
import { Form } from "@/components/ui/form";
import { EditFormData, editProfileSchema } from "@/schema/edit-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Dashboard = () => {
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
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <EditProfileInput
              placeholder="Name"
              label="Name"
              control={form.control}
              error={form.formState.errors.name}
              name="name"
            />
            <EditProfileInput
              placeholder="Description"
              label="Description"
              control={form.control}
              error={form.formState.errors.description}
              name="description"
            />
            <div className=" gap-2 grid grid-cols-2">
              <EditProfileInput
                placeholder="Country"
                label="Country"
                control={form.control}
                error={form.formState.errors.country}
                name="country"
              />
              <div>
                <EditProfileInput
                  placeholder="City"
                  label="City"
                  control={form.control}
                  error={form.formState.errors.city}
                  name="city"
                />
              </div>
            </div>
            <div className="mt-4 w-full">
              <button
                type="submit"
                className="px-4 py-2  w-full rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;
