import React, { Suspense } from "react";
import Loading from "../components/loader/Loading";
import NotFound from "@/components/NotFound";

const MainLayout = React.lazy(() => import("../layouts/MainLayouts"));
const HomePage = React.lazy(() => import("../pages/homePage/HomePage"));
const Members = React.lazy(() => import("../pages/members/Members"));
const Matches = React.lazy(() => import("../pages/matches/Matches"));

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
  ],
};
