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
import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type AuthType = "signIn" | "signUp" | null;

const UserMenu = () => {
  const [modal, setModal] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const handleModalOpen = (type: any) => {
    setAuthType(type);
    setModal(true);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage
              src={user?.picture?.url || "https://github.com/shadcn.png"}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {user ? user?.email : "Please sign in."}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user ? (
            <div className="flex flex-col gap-4">
              <Link to={"/user-profile"}>
                <DropdownMenuItem className="cursor-pointer text-[16px] hover:bg-gray-200">
                  Profile
                </DropdownMenuItem>
              </Link>

              <Button
                onClick={logout}
                asChild
                variant={"destructive"}
                className="w-full"
              >
                <DropdownMenuItem className="cursor-pointer flex items-center justify-center w-full">
                  Logout
                </DropdownMenuItem>
              </Button>
            </div>
          ) : (
            <React.Fragment>
              <DropdownMenuItem
                onClick={() => handleModalOpen("signUp")}
                className="cursor-pointer text-[16px] hover:bg-gray-200"
              >
                Sign Up
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleModalOpen("signIn")}
                className="cursor-pointer text-[16px] hover:bg-gray-200"
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
