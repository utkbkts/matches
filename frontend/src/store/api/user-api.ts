import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setisAuthenticated,
  setUser,
  setLoading,
} from "../features/user-slice";
import type { SignupType } from "@/types/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/auth`,
    credentials: "include",
  }),
  tagTypes: ["User", "Update"],
  endpoints: (builder) => ({
    getUser: builder.query<SignupType, string>({
      query: () => "/me",
      transformResponse: (response: { user: SignupType }) => response.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate(""));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    updatePhoto: builder.mutation({
      query(body) {
        return {
          url: "/photo/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User", "Update"],
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/profile/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User", "Update"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdatePhotoMutation,
  useUpdateProfileMutation,
} = userApi;
