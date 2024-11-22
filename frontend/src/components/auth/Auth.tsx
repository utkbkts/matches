import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import EditProfileInput from "../input/EditProfileInput";
import { Button } from "../ui/button";
import SelectInput from "../input/SelectInput";
import DatePickerInput from "../input/DatePicker";
import CountryListInput from "../input/CountryList";
import AvatarInput from "../input/AvatarInput";
import { createFormData, createFormSchema } from "@/schema/create-auth-schema";

interface AuthProps {
  type: "signIn" | "signUp" | null;
  setAuthType: React.Dispatch<React.SetStateAction<"signIn" | "signUp" | null>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Auth = ({ type, setModal }: AuthProps) => {
  const handleClose = () => setModal(false);
  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === "signUp" ? "Sign Up" : "Sign In"}</DialogTitle>
          <DialogDescription>
            {type === "signUp"
              ? "Create a new account."
              : "Sign in to your account."}
          </DialogDescription>
        </DialogHeader>
        <div>{type === "signIn" ? Login() : Register()}</div>
      </DialogContent>
    </Dialog>
  );
};

function Register() {
  const form = useForm<createFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      city: "",
      birthday: new Date(),
      country: "",
      status: "",
      picture: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: createFormData) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-2">
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.name}
              name="name"
              placeholder="Name"
              label="Name"
            />
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.email}
              name="email"
              placeholder="Email"
              label="Email"
            />
          </div>
          <div className="flex gap-2">
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.password}
              name="password"
              placeholder="Password"
              label="Password"
            />
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.confirmPassword}
              name="confirmPassword"
              placeholder="ConfirmPassword"
              label="ConfirmPassword"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <SelectInput
                control={form.control}
                error={form.formState.errors.gender}
                name="gender"
                label="Gender"
                options={[
                  { value: "male", label: "male" },
                  { value: "female", label: "female" },
                ]}
              />
            </div>
            <div className="flex-1">
              <DatePickerInput
                control={form.control}
                error={form.formState.errors.birthday}
                name="birthday"
                placeholder="Select your birthdate"
                label="Birthday"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <CountryListInput
                control={form.control}
                error={form.formState.errors.country}
                name="country"
                label="Country"
              />
            </div>
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.city}
              name="city"
              placeholder="City"
              label="City"
            />
          </div>
          <EditProfileInput
            control={form.control}
            error={form.formState.errors.status}
            name="status"
            placeholder="Status(optional)"
            label="Status(optional)"
          />
          <div>
            <AvatarInput
              control={form.control}
              error={form.formState.errors.picture}
              name="picture"
              label="Avatar"
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function Login() {
  return <div></div>;
}

export default Auth;
