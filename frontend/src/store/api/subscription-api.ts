import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/subscription`,
    credentials: "include",
  }),
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    createSubscriptin: builder.mutation({
      query(body) {
        return {
          url: "/stripe",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Subscription"],
    }),
    getById: builder.query({
      query: () => "/getById",
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useCreateSubscriptinMutation, useGetByIdQuery } =
  subscriptionApi;
