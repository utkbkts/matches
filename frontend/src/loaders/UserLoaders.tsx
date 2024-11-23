/* eslint-disable @typescript-eslint/no-unused-vars */
import store from "@/store/store";
import { redirect } from "react-router-dom";
import { userApi } from "@/store/api/user-api";

export const UserLoaders = async () => {
  const p = store.dispatch(userApi.endpoints.getUser.initiate(""));
  try {
    const response = await p.unwrap();
    return response;
  } catch (err) {
    return redirect("/");
  } finally {
    p.unsubscribe();
  }
};
