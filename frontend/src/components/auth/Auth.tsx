import React, { useEffect, useState } from "react";
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
import {
  createDataLogin,
  createFormData,
  createFormSchema,
  createLoginSchema,
} from "@/schema/create-auth-schema";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLoginMutation, useRegisterMutation } from "@/store/api/user-api";
import { getErrorMessage } from "@/helpers/error-message";
import { toast } from "sonner";

interface AuthProps {
  type: "signIn" | "signUp" | null;
  setAuthType: React.Dispatch<React.SetStateAction<"signIn" | "signUp" | null>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Auth = ({ type, setModal }: AuthProps) => {
  const handleClose = () => setModal(false);
  return (
    <div>
      <Dialog open onOpenChange={handleClose}>
        <DropdownMenu modal={false}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {type === "signUp" ? "Sign Up" : "Sign In"}
              </DialogTitle>
              <DialogDescription>
                {type === "signUp"
                  ? "Create a new account."
                  : "Sign in to your account."}
              </DialogDescription>
            </DialogHeader>

            <div>
              {type === "signIn" ? (
                <Login setModal={setModal} />
              ) : (
                <Register setModal={setModal} />
              )}
            </div>
          </DialogContent>
        </DropdownMenu>
      </Dialog>
    </div>
  );
};
function Register({ setModal }: any) {
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState("");
  const [
    createRegister,
    { error: registerError, isError, isSuccess, isLoading },
  ] = useRegisterMutation();

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
    },
    mode: "onChange",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      return setError(true);
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    setError(false);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isError) {
      const errorMessage = getErrorMessage(registerError);
      if (errorMessage) {
        setErrorData(errorMessage);
        setError(true);
      }
    }
    if (isSuccess) {
      setErrorData("Create account successfully !!");
      setError(true);
      setTimeout(() => {
        setModal(false);
        form.reset();
      }, 1000);
    }
  }, [isSuccess, isError, registerError, form]);

  const onSubmit = async (data: createFormData) => {
    await createRegister({ ...data, picture: image });
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
              type="text"
              label="Name"
            />
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.email}
              name="email"
              placeholder="Email"
              type="email"
              label="Email"
            />
          </div>
          <div className="flex gap-2">
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.password}
              name="password"
              placeholder="Password"
              type="password"
              label="Password"
            />
            <EditProfileInput
              control={form.control}
              error={form.formState.errors.confirmPassword}
              name="confirmPassword"
              type="password"
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
              type="text"
              label="City"
            />
          </div>
          <EditProfileInput
            control={form.control}
            error={form.formState.errors.status}
            name="status"
            placeholder="Status(optional)"
            label="Status(optional)"
            type="text"
          />
          <div>
            <AvatarInput
              control={form.control}
              error={form.formState.errors.picture}
              name="picture"
              label="Avatar"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          {image ? (
            <div className="relative w-32 h-32">
              <img
                src={image}
                alt="image"
                title="avatar profile picture"
                className="w-32 h-32 rounded-full object-cover"
              />
              <Badge
                onClick={() => setImage("")}
                variant="outline"
                className="cursor-pointer hover:bg-gray-400 bg-gray-200 absolute top-0 right-0"
              >
                X
              </Badge>
            </div>
          ) : null}
          {error && (
            <div
              className={`${
                isSuccess ? "bg-green-400" : "bg-destructive"
              } p-2 rounded-md w-full`}
            >
              <span className="text-sm  text-white flex items-center justify-center">
                {errorData}
              </span>
            </div>
          )}
          <div className="w-full flex items-center justify-end">
            <Button loading={isLoading} type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function Login({ setModal }: any) {
  const [loginMutation, { isSuccess, isError, error: loginError }] =
    useLoginMutation();
  const form = useForm<createDataLogin>({
    resolver: zodResolver(createLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isError) {
      const errorMessage = getErrorMessage(loginError);
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
    if (isSuccess) {
      toast.success("Login  successfully !!");
      setModal(false);
      form.reset();
    }
  }, [isSuccess, isError, loginError, form]);

  const onSubmit = async (data: any) => {
    await loginMutation(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <EditProfileInput
            control={form.control}
            name="email"
            placeholder="Email"
            type="email"
            label="Email"
          />
          <EditProfileInput
            control={form.control}
            name="password"
            placeholder="Password"
            type="password"
            label="Password"
          />
          <div className="w-full flex items-center justify-end mt-4">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Auth;
