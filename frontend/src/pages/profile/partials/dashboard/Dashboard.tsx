import EditProfileInput from "@/components/input/EditProfileInput";
import { Form } from "@/components/ui/form";
import { getErrorMessage } from "@/helpers/error-message";
import { EditFormData, editProfileSchema } from "@/schema/edit-profile-schema";
import {
  useGetUserQuery,
  useUpdateProfileMutation,
} from "@/store/api/user-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Dashboard = () => {
  const { data: getUser } = useGetUserQuery("");
  const [editProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();
  const form = useForm<EditFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      city: "",
      country: "",
      status: "",
      name: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (getUser) {
      form.setValue("name", getUser.name);
      form.setValue("status", getUser.status);
      form.setValue("city", getUser.city);
      form.setValue("country", getUser.country);
    }
  }, [getUser, form]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully!");
    }
    if (isError) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
    }
  }, [isError, error, isSuccess]);

  const onSubmit = async (data: EditFormData) => {
    await editProfile(data);
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
              placeholder="Status"
              label="Status"
              control={form.control}
              error={form.formState.errors.status}
              name="status"
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
