import { Outlet, useLocation } from "react-router-dom";
import PrimaryNavigation from "../components/PrmaryNavigation";
//import { useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";

function Root() {
  const location = useLocation();
  

  return (
    <div className="bg-light-background dark:bg-dark-background grid min-h-screen grid-rows-[min-content_1fr_min-content]">
      {location.pathname === "/login" || location === "/signup" ? <div className="ml-auto mr-4 mt-4"><ThemeToggle/></div> : (
        <header className="border-b-2 bg-light-navbar-background border-light-navbar-border dark:bg-dark-navbar-background dark:border-dark-navbar-border">
          <PrimaryNavigation />
        </header>
      )}

      <Outlet />
      {location.pathname === "/login" || location.pathname === "/signup" ? null : (
        <footer className="h-36 bg-white">footer</footer>
      )}
    </div>
  );
}

export default Root;
