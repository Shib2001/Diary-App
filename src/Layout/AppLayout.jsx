import Headers from "../UI/Headers";
import { Outlet } from "react-router-dom";
import Footers from "../UI/Footers";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-100 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <Headers />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footers />
    </div>
  );
};
