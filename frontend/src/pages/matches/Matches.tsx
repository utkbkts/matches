import { useState } from "react";

import MatchesItems from "./partials/MatchesItems";
import PaginationItems from "./partials/PaginationItems";
import { useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import AgeRange from "./partials/AgeRange";
import LocationOrder from "./partials/LocationOrder";
import MobileTopBar from "./partials/MobileTopBar";
import { useGetAllMembersQuery } from "@/store/api/member-api";
import { MembersType, SignupType } from "@/types/types";
import { useAppSelector } from "@/store/hooks";

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const minAge = searchParams.get("min") || "18";
  const maxAge = searchParams.get("max") || "50";
  const gender = searchParams.get("gender") || "";
  const { user } = useAppSelector((state) => state.auth);
  const params = {
    page,
    search,
    minAge,
    maxAge,
    ...(gender && { gender }),
  };
  if (gender) {
    params.gender = gender;
  }

  const { data } = useGetAllMembersQuery(params);

  //filtered me user
  const filterUser = data?.users?.filter(
    (item: SignupType) => item._id !== user?._id
  );
  const favoriteUserIds = user?.myFavorite?.map((item: any) => item.user);

  const filtered = filterUser?.filter((item: any) =>
    favoriteUserIds?.includes(item._id)
  );

  // Handle gender filter
  const handleGenderChange = (selectedGender: string) => {
    setCurrentPage(1);
    setSearchParams({
      page: "1",
      gender: selectedGender,
      search: search,
      min: minAge,
      max: maxAge,
    });
  };
  //handle Age Filter
  const handleAgeRange = (minAge: any, maxAge: any) => {
    setCurrentPage(1);
    setSearchParams({
      page: "1",
      min: minAge,
      max: maxAge,
      search: search,
      gender: gender || "",
    });
  };

  // Handle search

  const handleSearch = (search: string) => {
    searchParams.has("gender");
    setCurrentPage(1);
    setSearchParams({
      page: "1",
      gender: gender || "",
      search: search,
      min: minAge,
      max: maxAge,
    });
  };
  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    setCurrentPage(1);
  };
  return (
    <div className="w-full">
      <div className="shadow-xl w-full p-6 bg-white rounded-xl">
        <div className="xl:flex hidden items-center justify-between gap-6">
          <h1 className="font-bold text-gray-800 text-3xl">
            Results: {data?.totalCount}
          </h1>
          {/* Gender Selection */}
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-xl text-black/80">Gender:</h1>
            <div className="flex items-center gap-3">
              <img
                onClick={() => handleGenderChange("female")}
                src="/Female.svg"
                alt="Female"
                className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
              />
              <img
                onClick={() => handleGenderChange("male")}
                src="/Male.svg"
                alt="Male"
                className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 bg-gray-200 rounded-xl p-1"
              />
            </div>
          </div>

          {/* Age Range */}
          <div className="flex  flex-col    gap-3">
            <AgeRange handleAgeRange={handleAgeRange} />
          </div>

          {/* Order By Select */}
          <div className="w-[220px]">
            <LocationOrder
              handleSearch={handleSearch}
              membersData={filterUser}
              handleResetFilters={handleResetFilters}
            />
          </div>
        </div>
        <div className="xl:hidden block">
          <MobileTopBar />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 container mx-auto place-items-center">
        {filterUser?.map((member: MembersType) => {
          const isLiked = filtered?.some(
            (item: any) => item._id === member._id
          );
          return (
            <MatchesItems
              key={member._id}
              member={member}
              liked={isLiked} // Pass the "liked" state for each member
            />
          );
        })}
      </div>
      <div className="mt-12 container mx-auto w-full ">
        <Separator />
        <div className="flex items-center justify-between w-full p-4">
          <div className="w-full">
            <h1 className="text-muted-foreground text-md">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * data?.resPerPage + 1,
                data?.totalCount
              )}
              –{Math.min(currentPage * data?.resPerPage, data?.totalCount)} of{" "}
              {data?.totalCount} results
            </h1>
          </div>
          <PaginationItems
            totalItems={data?.totalCount}
            itemsPerPage={data?.resPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
