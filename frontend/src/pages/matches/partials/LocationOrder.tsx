import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import OutsideClickHandler from "react-outside-click-handler";
import { useGetAllMembersQuery } from "@/store/api/member-api";
import { MembersType } from "@/types/types";

const locationSchema = z.object({
  location: z
    .string()
    .regex(/^[^<>"]*$/, { message: "Invalid characters in search query" }),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface Props {
  handleSearch: (query: string) => void;
}

const LocationOrder = ({ handleSearch }: Props) => {
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
  const { data: membersData } = useGetAllMembersQuery(null);

  const locationSuggestions = useMemo(() => {
    if (!locationQuery) return [];

    return membersData?.users
      ?.filter((member: MembersType) =>
        member.country.toLowerCase().includes(locationQuery.toLowerCase())
      )
      .map((member: MembersType) => member.country)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );
  }, [locationQuery]);

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
              }}
            />
          )}
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}

          {isSuggestionsVisible &&
            locationQuery &&
            locationSuggestions.length > 0 && (
              <div
                id="location-modal"
                className="border border-gray-300 rounded mt-2 absolute bg-white z-50"
              >
                {locationSuggestions.map((location: any) => (
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
        </div>
      </OutsideClickHandler>
    </form>
  );
};

export default LocationOrder;
