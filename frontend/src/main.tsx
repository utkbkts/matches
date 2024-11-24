import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { userApi } from "./store/api/user-api.ts";
import { Toaster } from "@/components/ui/sonner";

store.dispatch(userApi.endpoints.getUser.initiate(""));
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors toastOptions={{}} theme="light" />
    </Provider>
  </StrictMode>
);
