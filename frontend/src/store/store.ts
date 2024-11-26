import { configureStore } from "@reduxjs/toolkit";
//slice reducer
import userReducer from "./features/user-slice";
import { userApi } from "./api/user-api";
import { memberApi } from "./api/member-api";
import { subscriptionApi } from "./api/subscription-api";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      memberApi.middleware,
      subscriptionApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
