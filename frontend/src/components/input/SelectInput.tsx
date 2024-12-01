import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

interface Props {
  control: any;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: any;
  className?: string | null;
}

const SelectInput = ({
  control,
  name,
  label,
  options,
  error,
  className,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange}>
              <SelectTrigger
                className={cn(
                  "border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full",
                  className
                )}
              >
                <SelectValue placeholder={field.value || "Select gender"} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

SelectInput.displayName = "SelectInput";

export default SelectInput;
