import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/messages`,
    credentials: "include",
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query({ body, id }) {
        return {
          url: `/send/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Messages"],
    }),
    getMessage: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Messages"],
    }),
  }),
});

export const { useSendMessageMutation, useGetMessageQuery } = messagesApi;
