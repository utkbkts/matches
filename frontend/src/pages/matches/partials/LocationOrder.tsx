import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import OutsideClickHandler from "react-outside-click-handler";
import { MembersType } from "@/types/types";

const locationSchema = z.object({
  location: z
    .string()
    .regex(/^[^<>"]*$/, { message: "Invalid characters in search query" }),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface Props {
  handleSearch: (query: string) => void;
  membersData: any;
  handleResetFilters: any;
}

const LocationOrder = ({
  handleSearch,
  membersData,
  handleResetFilters,
}: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    mode: "onChange",
  });

  const locationQuery = watch("location");
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);

  const locationSuggestions = useMemo(() => {
    if (!locationQuery || !membersData?.users) return [];

    return membersData?.users
      .filter((member: MembersType) => {
        const countryMatch = member.city
          .toLowerCase()
          .includes(locationQuery.toLowerCase());
        return countryMatch;
      })
      .map((member: MembersType) => member.city)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
  }, [locationQuery, membersData]);

  const handleLocationClick = (location: string) => {
    setValue("location", location, { shouldValidate: true });
    handleSearch(location);
    setSuggestionsVisible(false);
  };

  return (
    <form>
      <OutsideClickHandler onOutsideClick={() => setSuggestionsVisible(false)}>
        <div className="relative">
          <Input
            {...register("location")}
            placeholder="City or country"
            onFocus={() => setSuggestionsVisible(true)}
          />
          {locationQuery && (
            <X
              className="absolute top-2 right-2"
              onClick={() => {
                setValue("location", "", { shouldValidate: true });
                setSuggestionsVisible(false);
                handleResetFilters();
              }}
            />
          )}
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}

          {isSuggestionsVisible &&
            locationQuery &&
            locationSuggestions.length > 0 && (
              <div className="border border-gray-300 rounded mt-2 absolute bg-white z-50">
                {locationSuggestions.map((location: string) => (
                  <div
                    key={location}
                    onClick={() => handleLocationClick(location)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}

          {/* Display a fallback message if no suggestions are found */}
          {isSuggestionsVisible &&
            locationQuery &&
            locationSuggestions.length === 0 && (
              <div className="border border-gray-300 rounded mt-2 absolute bg-white z-50">
                <div className="p-2 text-gray-500">No suggestions found</div>
              </div>
            )}
        </div>
      </OutsideClickHandler>
    </form>
  );
};

export default LocationOrder;
