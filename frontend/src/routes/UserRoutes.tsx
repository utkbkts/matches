import { lazy, Suspense } from "react";
import Loading from "@/components/loader/Loading";
import NotFound from "@/components/NotFound";
import UserLayouts from "@/layouts/UserLayouts";
const UserProfile = lazy(() => import("@/pages/profile/Profile"));
const UpdatePackage = lazy(
  () => import("@/pages/profile/partials/dashboard/UpdatePackage")
);
const PhotoUpdate = lazy(
  () => import("@/pages/profile/partials/dashboard/PhotoUpdate")
);
const PasswordUpdate = lazy(
  () => import("@/pages/profile/partials/dashboard/PasswordUpdate")
);

export const UserRoutes = {
  path: "/user-profile",
  element: <UserLayouts />,
  errorElement: <NotFound />,
  children: [
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <UserProfile />
        </Suspense>
      ),
    },
    {
      path: "photos",
      element: (
        <Suspense fallback={<Loading />}>
          <PhotoUpdate />
        </Suspense>
      ),
    },
    {
      path: "password",
      element: (
        <Suspense fallback={<Loading />}>
          <PasswordUpdate />
        </Suspense>
      ),
    },
    {
      path: "package",
      element: (
        <Suspense fallback={<Loading />}>
          <UpdatePackage />
        </Suspense>
      ),
    },
  ],
};
