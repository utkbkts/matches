import React, { Suspense } from "react";
import Loading from "../components/loader/Loading";

const NotFound = React.lazy(() => import("../components/NotFound"));
const MainLayout = React.lazy(() => import("../layouts/MainLayouts"));
const HomePage = React.lazy(() => import("../pages/homePage/HomePage"));
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
  ],
};
