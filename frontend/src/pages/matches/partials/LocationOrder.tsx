import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { membersData } from "@/pages/members/Members";
import { useMemo } from "react";
import { X } from "lucide-react";

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
  const locationSuggestions = useMemo(() => {
    if (!locationQuery) return [];

    return membersData
      .filter((member) =>
        member.country.toLowerCase().includes(locationQuery.toLowerCase())
      )
      .map((member) => member.country)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [locationQuery]);

  const handleLocationClick = (location: string) => {
    setValue("location", location, { shouldValidate: true });
    handleSearch(location);
  };

  return (
    <form>
      <div className="relative">
        <Input {...register("location")} placeholder="City or country" />
        {locationQuery && (
          <X
            className="absolute top-2 right-2"
            onClick={() => {
              setValue("location", "", { shouldValidate: true });
            }}
          />
        )}
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {/* Location suggestions */}
        {locationQuery && locationSuggestions.length > 0 && (
          <div
            id="location-modal"
            className="border border-gray-300 rounded mt-2 absolute bg-white z-50"
          >
            {locationSuggestions.map((location) => (
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
    </form>
  );
};

export default LocationOrder;
