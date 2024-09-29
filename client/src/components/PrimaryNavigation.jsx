import { useState } from "react";
import { Link, NavLink,useLocation } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./LogoutButton";

function PrimaryNavigation() {
  const [isOpened, toggle] = useState(false);
  const location = useLocation()
  
  const isAdmin=location.pathname.startsWith("/admin")
  return (
    <nav className="mx-auto xl:container px-4 py-6 flex flex-row justify-between items-center flex-wrap text-light-navbar-text dark:text-dark-navbar-text">
      {/* brand */}
      <Link className="block text-4xl" to={isAdmin?"/admin":"/"}>Learning</Link>

          <div className="flex gap-2 lg:ml-auto lg:mr-5">
              <ThemeToggle/>
          {/* toggle button */}
      <button
        onClick={() => {
          toggle(!isOpened);
        }}
        className="lg:hidden aspect-square h-10 flex justify-center items-center"
      >
        <span className="sr-only">Menu</span>
        <MenuIcon CurrentState={isOpened}  />
      </button>
    
          </div>
          
      {/* navigation */}
      <ul
        className={`${
          isOpened ? "flex" : "hidden"
        } mt-4 flex-col basis-full items-center justify-center lg:flex lg:basis-0 lg:flex-row lg:justify-between lg:mt-0 gap-4 `}
      >
        {isAdmin ? (
        <>
        <li>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/profile">Profile</NavLink>
        </li>
      </>
        ): (
          <>
          <li>
          <NavLink to={"/"}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to={"/courses"}>Courses</NavLink>
        </li>
        <li>
          <NavLink to={"/profile"}>Profile</NavLink>
              </li>
          </>
        )}
        <li>
                <LogoutButton/>
              </li>
      </ul>
    </nav>
  );
}

export default PrimaryNavigation;
