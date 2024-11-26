/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import Loading from "@/components/loader/Loading";
import NotFound from "@/components/NotFound";
import MemberLayout from "@/layouts/MemberLayout";

// Bileşenleri lazy-load ile tanımladık
const MemberChat = lazy(() => import("@/pages/members/partials/MemberChat"));
const MemberPhotos = lazy(
  () => import("@/pages/members/partials/MemberPhotos")
);
const MemberProfile = lazy(
  () => import("@/pages/members/partials/MemberProfile")
);

export const MemberRoutes = {
  path: "/members/details/:id/profile",
  element: <MemberLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <MemberProfile />
        </Suspense>
      ),
    },
    {
      path: "photos",
      element: (
        <Suspense fallback={<Loading />}>
          <MemberPhotos />
        </Suspense>
      ),
    },
    {
      path: "chat",
      element: (
        <Suspense fallback={<Loading />}>
          <MemberChat />
        </Suspense>
      ),
    },
  ],
};
