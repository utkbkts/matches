import Toast from "@/components/toast/Toast";
import { axios } from "@/lib/axios";
import { SignupType } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signUp: async ({ name, email, password }: SignupType) => {
    set({ loading: true });

    try {
      const promiseFunction = axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      const res = await promiseFunction;

      Toast({
        promiseFunction: () => promiseFunction,
        title: "Registration successful",
        errorMessage: res.data?.message,
      });

      set({ user: res.data, loading: false });
    } catch (error: any) {
      set({ loading: false });

      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  },
  login: async ({ email, password }: SignupType) => {
    set({ loading: true });

    try {
      const promiseFunction = axios.post("/auth/login", {
        email,
        password,
      });

      const res = await promiseFunction;

      Toast({
        promiseFunction: () => promiseFunction,
        title: "Login is successful",
        errorMessage: res.data?.message,
      });

      set({ user: res.data, loading: false });
    } catch (error: any) {
      set({ loading: false });

      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error: any) {
      set({ checkingAuth: false, user: null });
      console.log(error.response.data.message);
    }
  },
}));
