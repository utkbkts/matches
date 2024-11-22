import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
interface Props {
  control: any;
  name: string;
  label: string;
  error?: any;
  className?: string | null;
  type: "file";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarInput = ({
  control,
  name,
  label,
  error,
  type,
  onChange,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} onChange={onChange} />
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default AvatarInput;
