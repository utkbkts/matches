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
}

const EditProfileInput = ({
  control,
  name,
  label,
  placeholder,
  error,
  multiline,
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
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default EditProfileInput;
