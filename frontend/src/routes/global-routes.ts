import { createBrowserRouter } from "react-router-dom";
import { MainRoutes } from "./MainRoutes";
import { MemberRoutes } from "./MemberRoutes";

export const router = createBrowserRouter([MainRoutes, MemberRoutes]);
