/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import Loading from "@/components/loader/Loading";
import NotFound from "@/components/NotFound";

// Bileşenleri lazy-load ile tanımladık
const MemberLayout = lazy(() => import("@/layouts/MemberLayout"));
const MemberChat = lazy(() => import("@/pages/members/partials/MemberChat"));
const MemberPhotos = lazy(
  () => import("@/pages/members/partials/MemberPhotos")
);
const MemberProfile = lazy(
  () => import("@/pages/members/partials/MemberProfile")
);

export const MemberRoutes = {
  path: "/members/details/:id/profile",
  element: (
    <Suspense fallback={<Loading />}>
      <MemberLayout />
    </Suspense>
  ),
  errorElement: <NotFound />,
  children: [
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
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <MemberProfile />
        </Suspense>
      ),
    },
  ],
};
