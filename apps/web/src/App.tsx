import { RouterProvider } from "react-router-dom";

import { router } from "./app/web";

export default function App() {
  return <RouterProvider router={router} />;
}
