import { RouterProvider } from "react-router";
import { appRoutes } from "./routes/routes";

export const HabitsMain = () => {
  return <RouterProvider router={appRoutes} />;
};
