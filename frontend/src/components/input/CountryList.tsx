/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
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

const CountryListInput = ({
  control,
  name,
  label,
  error,
  className,
}: Props) => {
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<
    { value: string; label: string }[]
  >([]);

  const debouncedSearch = useCallback((query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const result = Object.entries(countries)
      .filter(([code, data]) =>
        data.name.toLowerCase().includes(lowercasedQuery)
      )
      .map(([code, data]) => ({
        value: code,
        label: data.name,
      }));
    setFilteredCountries(result);
  }, []);

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
      render={({ field }) => {
        return (
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
                  <SelectValue placeholder={field.value || "Select Country"} />
                </SelectTrigger>
                <SelectContent>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Search for a country..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {filteredCountries.map((option) => (
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
};

export default CountryListInput;
