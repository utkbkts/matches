/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Loading from "../components/loader/Loading";
import NotFound from "@/components/NotFound";
import SuccessPage from "@/components/successPage/SuccessPage";

const MainLayout = React.lazy(() => import("@/layouts/MainLayouts"));
const HomePage = React.lazy(() => import("@/pages/homePage/HomePage"));
const Members = React.lazy(() => import("@/pages/members/Members"));
const Matches = React.lazy(() => import("@/pages/matches/Matches"));
const ListPage = React.lazy(() => import("@/pages/list/ListPage"));
const Messages = React.lazy(() => import("@/pages/messages/Messages"));

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "members",
      element: (
        <Suspense fallback={<Loading />}>
          <Members />
        </Suspense>
      ),
    },
    {
      path: "matches",
      element: (
        <Suspense fallback={<Loading />}>
          <Matches />
        </Suspense>
      ),
    },
    {
      path: "lists",
      element: (
        <Suspense fallback={<Loading />}>
          <ListPage />
        </Suspense>
      ),
    },
    {
      path: "messages",
      element: (
        <Suspense fallback={<Loading />}>
          <Messages />
        </Suspense>
      ),
    },
    {
      path: "success",
      element: (
        <Suspense fallback={<Loading />}>
          <SuccessPage />
        </Suspense>
      ),
    },
  ],
};
