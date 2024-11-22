import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  error?: any;
}

const DatePickerInput = ({
  control,
  name,
  label,
  placeholder,
  error,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <DatePicker
                selected={field.value || null}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText={placeholder}
                className="border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full p-1"
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default DatePickerInput;
