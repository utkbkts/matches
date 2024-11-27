import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { userApi } from "./store/api/user-api.ts";
import { Toaster } from "@/components/ui/sonner";
import { SocketProvider } from "./context/SocketContext.tsx";

store.dispatch(userApi.endpoints.getUser.initiate(""));
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
        <Toaster richColors toastOptions={{}} theme="light" />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
