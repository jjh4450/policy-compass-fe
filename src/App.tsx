import { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@shared/routing/boroserRouter.tsx";

/**
 * The main application component.
 * @returns {JSX.Element} The rendered application component.
 */
function App(): JSX.Element {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
