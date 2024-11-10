import { useEffect, useState } from "react";

import MatchesItems from "./partials/MatchesItems";
import { membersData } from "../members/Members";
import PaginationItems from "./partials/PaginationItems";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import calculateAge from "@/helpers/dateFormat";
import AgeRange from "./partials/AgeRange";
import LocationOrder from "./partials/LocationOrder";

const FilterSection = () => {
  const [isOn, setIsOn] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchParams, setSearchParams] = useSearchParams();

  //pagination logic
  const lastItemsIndex = currentPage * itemsPerPage;
  const firstItemsIndex = lastItemsIndex - itemsPerPage;

  // Get search parameters (gender, minAge, maxAge)
  const gender = searchParams.get("gender");
  const minAge = Number(searchParams.get("minAge")) || 18; // Default to 18 if not set
  const maxAge = Number(searchParams.get("maxAge")) || 50; // Default to 50 if not set
  const withImage = searchParams.get("withImage");

  // Filter members based on `isActive` and `gender` criteria
  const filteredMembers = membersData.filter(
    (item) =>
      item.isActive === true &&
      (!gender || item.gender === gender) &&
      calculateAge(item.dateOfBirth) >= minAge &&
      calculateAge(item.dateOfBirth) <= maxAge &&
      (withImage === "true" ? item.image : true)
  );
  const currentItems = filteredMembers.slice(firstItemsIndex, lastItemsIndex);
  //searchParams Logic

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams]);

  const updatePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      page: page.toString(),
      minAge: minAge.toString(),
      maxAge: maxAge.toString(),
      withImage: withImage || "true",
    });
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
    setCurrentPage(1);
    setSearchParams({
      page: "1",
      withImage: !isOn ? "true" : "false",
      minAge: minAge.toString(),
      maxAge: maxAge.toString(),
    });
  };
  //result count
  const resultCount = filteredMembers.length;
  //gender selection filter
  const handleToggleGender = (gender: string) => {
    setCurrentPage(1);
    setSearchParams({ page: "1", gender });
  };

  // Handle age range filter changes
  const handleAgeRange = (minAge: number, maxAge: number) => {
    setCurrentPage(1);
    setSearchParams({
      page: "1",
      minAge: minAge.toString(),
      maxAge: maxAge.toString(),
    });
  };

  return (
    <div className="w-full">
      <div className="shadow-xl w-full p-6 bg-white rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h1 className="font-bold text-gray-800 text-3xl">
            Results: {resultCount}
          </h1>

          {/* Gender Selection */}
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-xl text-black/80">Gender:</h1>
            <div className="flex items-center gap-3">
              <img
                onClick={() => handleToggleGender("female")}
                src="/Female.svg"
                alt="Female"
                className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
              />
              <img
                onClick={() => handleToggleGender("male")}
                src="/Male.svg"
                alt="Male"
                className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
              />
            </div>
          </div>

          {/* Age Range */}
          <div className="flex  flex-col  w-[250px] gap-3">
            <AgeRange handleAgeRange={handleAgeRange} />
          </div>

          {/* With Range Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600">With Photo</span>
            <div className="relative">
              <button
                onClick={toggleSwitch}
                className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer 
                ${isOn ? " bg-green-500" : " bg-gray-300"}`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all 
                  ${isOn ? "translate-x-8" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div>

          {/* Order By Select */}
          <div className="w-[220px]">
            <LocationOrder />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 container mx-auto place-items-center">
        {currentItems.map((member, index) => (
          <MatchesItems key={index} member={member} />
        ))}
      </div>
      <div className="mt-12 container mx-auto w-full ">
        <Separator />
        <div className="flex items-center justify-between w-full p-4">
          <div className="w-full">
            <h1 className="text-muted-foreground text-md">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                membersData.length
              )}
              –{Math.min(currentPage * itemsPerPage, membersData.length)} of{" "}
              {membersData.length} results
            </h1>
          </div>
          <PaginationItems
            totalItems={filteredMembers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={updatePage}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
