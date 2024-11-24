import EditProfileInput from "@/components/input/EditProfileInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getErrorMessage } from "@/helpers/error-message";
import {
  PasswordUpdateFormData,
  passwordUpdateSchema,
} from "@/schema/edit-password";
import { useUpdatePasswordMutation } from "@/store/api/user-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PasswordUpdate = () => {
  const [passwordUpdate, { isSuccess, isError, error }] =
    useUpdatePasswordMutation();
  const form = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile password successfully!");
      form.reset();
    }
    if (isError) {
      const errorMsg = getErrorMessage(error);
      toast.error(errorMsg);
    }
  }, [isError, error, isSuccess]);

  const onSubmit = async (data: any) => {
    const userData = {
      currentPassword: data.currentPassword,
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    await passwordUpdate(userData);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <EditProfileInput
            control={form.control}
            error={form.formState.errors.currentPassword}
            name="currentPassword"
            placeholder="Current Password"
            type="password"
            label="Current Password"
          />
          <EditProfileInput
            control={form.control}
            error={form.formState.errors.currentPassword}
            name="newPassword"
            placeholder="New Password"
            type="password"
            label="New Password"
          />
          <EditProfileInput
            control={form.control}
            error={form.formState.errors.currentPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
          />
          <div className="mt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Password Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordUpdate;
