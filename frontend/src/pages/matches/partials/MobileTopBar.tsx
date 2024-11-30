import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import LocationOrder from "./LocationOrder";
import AgeRange from "./AgeRange";
import { MembersType } from "@/types/types";

interface Props {
  handleSearch: (query: string) => void;
  membersData: MembersType[];
  handleResetFilters: () => void;
  handleAgeRange: (minAge: number, maxAge: number) => void;
  handleGenderChange: (gender: any) => void;
}

const MobileTopBar = ({
  handleSearch,
  membersData,
  handleResetFilters,
  handleAgeRange,
  handleGenderChange,
}: Props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
  };
  return (
    <div className="relative">
      <h1 className="text-black cursor-pointer" onClick={handleClick}>
        {active ? <X /> : <AlignJustify />}
      </h1>
      {active && (
        <div className="absolute bg-white shadow-md w-full rounded-md h-[40vh] z-50 top-[48px]">
          <div className="flex flex-col  px-4 gap-5 mt-12">
            <LocationOrder
              handleSearch={handleSearch}
              membersData={membersData}
              handleResetFilters={handleResetFilters}
            />
            <AgeRange handleAgeRange={handleAgeRange} />
            {/* Gender Selection */}
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-xl text-black/80">Gender:</h1>
              <div className="flex items-center gap-4">
                <img
                  onClick={() => {
                    handleGenderChange("female");
                    handleClick();
                  }}
                  src="/Female.svg"
                  alt="Female"
                  className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
                />
                <img
                  onClick={() => {
                    handleGenderChange("male");
                    handleClick();
                  }}
                  src="/Male.svg"
                  alt="Male"
                  className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileTopBar;
