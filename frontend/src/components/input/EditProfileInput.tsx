import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  error?: any;
  multiline?: boolean;
  type?: "text" | "password" | "email";
}

const EditProfileInput = ({
  control,
  name,
  label,
  placeholder,
  error,
  multiline,
  type,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {multiline ? (
              <Textarea
                className="w-full p-2 border rounded-md resize-none"
                placeholder={placeholder}
                {...field}
                rows={6}
              />
            ) : (
              <Input placeholder={placeholder} {...field} type={type} />
            )}
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
EditProfileInput.displayName = "EditProfileInput";
export default EditProfileInput;
