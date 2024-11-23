import { configureStore } from "@reduxjs/toolkit";
//slice reducer
import userReducer from "./features/user-slice";
import { userApi } from "./api/user-api";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
