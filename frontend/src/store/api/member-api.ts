import { getAgeDate } from "@/helpers/date-format";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const memberApi = createApi({
  reducerPath: "memberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/members`,
    credentials: "include",
  }),
  tagTypes: ["Member"],
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: (params) => {
        console.log(params);
        return {
          url: "/filter",
          params: {
            page: params?.page,
            search: params?.search,
            gender: params?.gender,
            "birthday[gte]": getAgeDate(params?.maxAge),
            "birthday[lte]": getAgeDate(params?.minAge),
          },
        };
      },
      providesTags: ["Member"],
    }),
  }),
});

export const { useGetAllMembersQuery } = memberApi;
