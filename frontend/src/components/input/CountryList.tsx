import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { countries } from "countries-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
interface Props {
  control: any;
  name: string;
  label: string;
  error?: any;
  className?: string | null;
}

const CountryListInput = React.forwardRef<HTMLDivElement | null, Props>(
  ({ control, name, label, error, className }: Props, ref) => {
    const countryList = Object.entries(countries).map(([code, data]) => ({
      value: code,
      label: data.name,
    }));
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem ref={ref}>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    className={cn(
                      "border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full",
                      className
                    )}
                  >
                    <SelectValue
                      placeholder={field.value || "Select Country"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countryList.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          );
        }}
      />
    );
  }
);

CountryListInput.displayName = "CountryListInput";

export default CountryListInput;
