import { RouterProvider } from "react-router-dom";
import { router } from "./routes/global-routes";
import React, { Suspense } from "react";

const App = () => {
  return (
    <React.Fragment>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </React.Fragment>
  );
};

export default App;
