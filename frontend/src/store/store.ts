import { configureStore } from "@reduxjs/toolkit";
//slice reducer
import userReducer from "./features/user-slice";
import messageReducer from "./features/message-slice";
import { userApi } from "./api/user-api";
import { memberApi } from "./api/member-api";
import { subscriptionApi } from "./api/subscription-api";
import { messagesApi } from "./api/messages-api";

const store = configureStore({
  reducer: {
    auth: userReducer,
    message: messageReducer,
    [userApi.reducerPath]: userApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      memberApi.middleware,
      subscriptionApi.middleware,
      messagesApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
