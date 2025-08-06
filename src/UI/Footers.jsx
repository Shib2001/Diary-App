import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaGithub />,
    url: "https://github.com/Shib2001",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/shiv-kumarjha/",
    label: "LinkedIn",
  },
  {
    icon: <FaTwitter />,
    url: "https://x.com/Shivkum18097172",
    label: "Twitter",
  },
];

const Footers = () => {
  return (
    <motion.footer
      className="w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <span className="text-sm text-gray-500 dark:text-gray-400 text-center w-full sm:w-auto">
        &copy; {new Date().getFullYear()} My Diary. All rights reserved.
      </span>
      <div className="flex items-center justify-center gap-4 w-full sm:w-auto">
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-100 transition-opacity text-xl text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-yellow-300"
            title={link.label}
            whileHover={{ scale: 1.2, rotate: -8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </motion.footer>
  );
};

export default Footers;
