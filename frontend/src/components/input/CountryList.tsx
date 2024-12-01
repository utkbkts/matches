/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
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

interface Country {
  name?: string;
  value: string;
  label: string;
}

interface Props {
  control: any;
  name: string;
  label: string;
  error?: any;
  className?: string | null;
}

const CountryListInput = ({
  control,
  name,
  label,
  error,
  className,
}: Props) => {
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const debouncedSearch = useCallback((query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const result = Object.values(countries)
      .filter((data) => data.name.toLowerCase().includes(lowercasedQuery))
      .map((data) => ({
        label: data.name,
        value: data.name,
      }));
    setFilteredCountries(result);
  }, []);

  // Handle search effect
  useEffect(() => {
    if (search.length > 2) {
      debouncedSearch(search);
    } else {
      setFilteredCountries([]);
    }
  }, [search, debouncedSearch]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className={cn(
                  "border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full",
                  className
                )}
              >
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Search for a country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No countries found</div>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CountryListInput;
