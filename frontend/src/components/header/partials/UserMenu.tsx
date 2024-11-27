import Auth from "@/components/auth/Auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/store/api/user-api";
import { setisAuthenticated, setUser } from "@/store/features/user-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type AuthType = "signIn" | "signUp" | null;

const UserMenu = () => {
  const [modal, setModal] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleModalOpen = (type: any) => {
    setAuthType(type);
    setModal(true);
  };

  console.log("🚀 ~ UserMenu ~ user:", user);
  const handleLogout = async () => {
    try {
      await logout("");
      dispatch(setUser(null));
      dispatch(setisAuthenticated(false));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="border-2 border-gray-300 rounded-full hover:border-gray-400 transition-all duration-200">
            <AvatarImage
              src={user?.picture?.url || "https://github.com/shadcn.png"}
              alt="User Avatar"
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-lg min-w-[200px]">
          <DropdownMenuLabel className="text-sm font-medium text-gray-800 text-center px-4 py-2">
            {user ? user?.email : "Hi."}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user ? (
            <div className="flex flex-col gap-2 p-2">
              <Link to="/user-profile">
                <DropdownMenuItem className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  Profile
                </DropdownMenuItem>
              </Link>

              <Button
                onClick={handleLogout}
                asChild
                variant={"destructive"}
                className="w-full"
              >
                <DropdownMenuItem className="cursor-pointer text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center justify-center w-full">
                  Logout
                </DropdownMenuItem>
              </Button>
            </div>
          ) : (
            <React.Fragment>
              <DropdownMenuItem
                onClick={() => handleModalOpen("signUp")}
                className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Sign Up
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleModalOpen("signIn")}
                className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Sign In
              </DropdownMenuItem>
            </React.Fragment>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Modal için */}
      {modal && (
        <Auth setAuthType={setAuthType} type={authType} setModal={setModal} />
      )}
    </div>
  );
};

export default UserMenu;
