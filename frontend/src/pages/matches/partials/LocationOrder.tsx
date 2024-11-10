import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Country, State, City } from "country-state-city";

const LocationOrder = () => {
  return (
    <div>
      {" "}
      <Select>
        <SelectTrigger className="w-full p-3 border rounded-md bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationOrder;
