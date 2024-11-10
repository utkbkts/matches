import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import MatchesItems from "./partials/MatchesItems";
import { membersData } from "../members/Members";
import PaginationItems from "./partials/PaginationItems";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const FilterSection = () => {
  const [isOn, setIsOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchParams, setSearchParams] = useSearchParams();

  const lastItemsIndex = currentPage * itemsPerPage;
  const firstItemsIndex = lastItemsIndex - itemsPerPage;
  const currentItems = membersData.slice(firstItemsIndex, lastItemsIndex);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams]);

  const updatePage = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };
  const toggleSwitch = () => setIsOn(!isOn);
  return (
    <div className="w-full">
      <div className="shadow-xl w-full p-6 bg-white rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h1 className="font-bold text-gray-800 text-3xl">Results: 5</h1>

          {/* Gender Selection */}
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-xl text-black/80">Gender:</h1>
            <div className="flex items-center gap-3">
              <img
                src="/Female.svg"
                alt="Female"
                className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
              />
              <img
                src="/Male.svg"
                alt="Male"
                className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
              />
            </div>
          </div>

          {/* Age Range */}
          <div className="flex  flex-col  w-[250px] gap-3">
            <span className="text-gray-600 flex items-center justify-between w-full">
              Age Range <span>18 - 50</span>
            </span>
            <input
              type="range"
              className=" w-[250px]"
              min="18"
              max="50"
              step="1"
            />
          </div>

          {/* With Range Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600">With Range</span>
            <div className="relative">
              <button
                onClick={toggleSwitch}
                className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer 
                ${isOn ? "bg-green-500" : "bg-gray-300"}`}
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
            totalItems={membersData.length}
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
