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
    getMemberById: builder.query({
      query: () => "/byId",
      providesTags: ["Member"],
    }),
    memberAll: builder.query({
      query: () => "/memberAll",
      providesTags: ["Member"],
    }),
    userById: builder.query({
      query: (id) => `/userById/${id}`,
      providesTags: ["Member"],
    }),
  }),
});

export const {
  useGetAllMembersQuery,
  useGetMemberByIdQuery,
  useMemberAllQuery,
  useUserByIdQuery,
} = memberApi;
