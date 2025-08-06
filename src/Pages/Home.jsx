import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Replace with your own diary image if available

const Home = () => {
  return (
    <section className="flex flex-col items-center min-h-screen px-2 sm:px-4 w-full pb-8">
      <motion.h1
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-amber-600 mb-6 sm:mb-8 mt-8 sm:mt-13 text-center transition duration-300 cursor-pointer hover:text-amber-500 hover:[text-shadow:0_0_16px_rgba(251,191,36,0.8)]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Welcome to My Diary App
      </motion.h1>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-4xl gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* Left: Image */}
        <motion.div
          className="flex-1 flex items-center justify-center w-full"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Link to="/create" className="w-full flex justify-center">
            <motion.img
              src="/Diary.png"
              alt="Diary"
              className="w-40 h-40 xs:w-52 xs:h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain drop-shadow-lg rounded-xl transition-transform duration-300 cursor-pointer hover:scale-110"
              whileHover={{ scale: 1.12, rotate: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>
        </motion.div>
        {/* Right: Intro/Poem */}
        <motion.div
          className="flex-1 w-full text-center md:text-right mt-4 md:mt-15"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.p
            className="text-sm xs:text-base md:text-lg text-amber-800 dark:text-yellow-100 opacity-80 font-serif italic leading-relaxed px-1 sm:px-0"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            "Within these pages, let your soul unfold.
            <br />
            Write the laughter, the tears, the dreams yet untold.
            <br />
            For every word you pen is a memory you keep,
            <br />
            And every diary entry is a promise you reap.
            <br />
            <br />
            Let ink be your lantern through the night,
            <br />
            And paper the canvas for your heart's delight.
            <br />
            <br />
            Here, secrets find shelter and hopes take flight,
            <br />
            In the gentle hush of a diary’s light.
            <br />
            So write your story, let your spirit be free—
            <br />
            This is your haven, your legacy."
          </motion.p>
        </motion.div>
      </div>
      {/* Button to Dashboard */}
      <div className="w-full flex justify-center mt-2 mb-8">
        <Link
          to="/create"
          className="w-full max-w-xs sm:max-w-sm px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow transition-colors text-base sm:text-lg text-center"
        >
          Let's Write Diary
        </Link>
      </div>
    </section>
  );
};

export default Home;
