/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";

const AppHeader = ({ authenticated, onLogout, currentUser }) => {

  const userLogged = currentUser !== null;
  let isUserAdmin = false;
  if (userLogged) {
    isUserAdmin = currentUser.role === "ADMIN";
  }
  return (
    <>
      <header aria-label="Page Header" className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
                <Link to="/" className="app-title">
                  YUMMY FOODS 🍽️
                </Link>
              </h1>

              <p className="mt-0 text-sm text-gray-500">
                Enjoy the convenience, order your food online!! 🥐🥯🥞🍔🍕
              </p>
            </div>
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-4">

                <span
                  areahidden="true"
                  className="block h-6 w-px rounded-full bg-gray-200"
                />
              </div>

              <nav className="app-nav">
                {authenticated ? (
                  <ul>
                    {isUserAdmin && (
                      <li>
                        <NavLink to="/users">Users</NavLink>
                      </li>
                    )}
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <a onClick={onLogout}>Logout</a>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="/signup">Signup</NavLink>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
