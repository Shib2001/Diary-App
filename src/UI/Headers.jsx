import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../Auth";
import { FaBook, FaUserCircle, FaBars } from "react-icons/fa";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Create", path: "/create" },
  { name: "Dashboard", path: "/dashboard" },
];

const Headers = () => {
  const location = useLocation();
  const userCtx = useContext(UserContext);
  const user = userCtx?.user || userCtx;
  const handleLogout = userCtx?.handleLogout;
  const displayName =
    user?.user_metadata?.display_name ||
    (user?.email ? user.email.split("@")[0] : "User");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="w-full px-2 sm:px-6 py-4 bg-white dark:bg-gray-900 shadow-md"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden w-full">
        <div className="flex items-center justify-between w-full">
          {/* Hamburger */}
          <button
            className="p-2 text-amber-500 dark:text-yellow-300 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <FaBars className="text-2xl" />
          </button>
          {/* Logo & Title Centered */}
          <div className="flex-1 flex justify-center">
            <span className="flex items-center gap-2">
              <FaBook className="text-2xl text-amber-500 dark:text-yellow-300" />
              <span className="font-bold text-xl text-gray-800 dark:text-yellow-100 tracking-wide">
                My Diary
              </span>
            </span>
          </div>
          {/* Username & Icon on Right */}
          {user ? (
            <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-yellow-200 transition duration-300 hover:text-amber-500 hover:[text-shadow:0_0_10px_rgba(251,191,36,0.7)]">
              <FaUserCircle className="text-xl transition duration-300 group-hover:text-amber-500 group-hover:[text-shadow:0_0_10px_rgba(251,191,36,0.7)]" />
              {displayName}
            </span>
          ) : (
            <span className="w-8" />
          )}
        </div>
        {/* Hamburger Menu Drawer */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
          className="mt-3 rounded-xl shadow-lg border border-amber-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col gap-2 p-4 z-50 absolute left-2 right-2 top-16"
        >
          {menuOpen && (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium text-gray-700 dark:text-yellow-100 hover:text-amber-500 dark:hover:text-yellow-300 transition-colors px-3 py-2 rounded text-lg ${
                    location.pathname === link.path
                      ? "bg-amber-100 dark:bg-gray-800"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user && handleLogout && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="font-medium text-gray-700 dark:text-yellow-100 hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-2 rounded text-lg cursor-pointer text-left"
                  style={{ textAlign: "left" }}
                >
                  Logout
                </button>
              )}
            </>
          )}
        </motion.div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between w-full pr-24 lg:pr-32 xl:pr-40">
        <div className="flex items-center gap-2">
          <FaBook className="text-2xl text-amber-500 dark:text-yellow-300" />
          <span className="font-bold text-xl text-gray-800 dark:text-yellow-100 tracking-wide">
            My Diary
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 w-full sm:w-auto">
          {user && (
            <span className="flex items-center gap-2 font-medium text-gray-600 dark:text-yellow-200 transition duration-300 hover:text-amber-500 hover:[text-shadow:0_0_10px_rgba(251,191,36,0.7)] cursor-pointer ml-4">
              <FaUserCircle className="text-xl transition duration-300 group-hover:text-amber-500 group-hover:[text-shadow:0_0_10px_rgba(251,191,36,0.7)]" />
              {displayName}
            </span>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium text-gray-700 dark:text-yellow-100 hover:text-amber-500 dark:hover:text-yellow-300 transition-colors px-3 py-1 rounded${
                location.pathname === link.path
                  ? " bg-amber-100 dark:bg-gray-800"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && handleLogout && (
            <button
              onClick={handleLogout}
              className="font-medium text-gray-700 dark:text-yellow-100 hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-1 rounded text-base cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </motion.header>
  );
};
export default Headers;
