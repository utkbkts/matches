import { createSlice } from "@reduxjs/toolkit";
import { SignupType } from "@/types/types";

interface UserState {
  user: SignupType | null;
  isAuthenticated: boolean;
  loading: boolean;
}
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setisAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated, setLoading } = userSlice.actions;
