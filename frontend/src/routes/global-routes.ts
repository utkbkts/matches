import { createBrowserRouter } from "react-router-dom";
import { MainRoutes } from "./MainRoutes";
import { MemberRoutes } from "./MemberRoutes";
import { UserRoutes } from "./UserRoutes";

export const router = createBrowserRouter([
  MainRoutes,
  MemberRoutes,
  UserRoutes,
]);
