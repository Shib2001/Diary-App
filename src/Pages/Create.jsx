import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { UserContext } from "../Auth";
import { Link } from "react-router-dom";

const Create = () => {
  const contextUser = useContext(UserContext); // Whatever your Auth context gives
  const [currentUser, setCurrentUser] = useState(null);

  const [title, setTitle] = useState("");
  const [noteDate, setNoteDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Make sure we always have the real Supabase user object
  useEffect(() => {
    const getUser = async () => {
      if (contextUser?.id) {
        setCurrentUser(contextUser);
      } else if (contextUser?.user?.id) {
        setCurrentUser(contextUser.user);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUser(user);
      }
    };
    getUser();
  }, [contextUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!currentUser) {
      setError("You must be logged in to create a note.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("notes").insert([
      {
        user_id: currentUser.id,
        title,
        note_date: noteDate,
        description,
      },
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess("Note created successfully!");
      setTitle("");
      setNoteDate("");
      setDescription("");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-6 p-3 xs:p-4 sm:p-6 w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="bg-yellow-50 dark:bg-gray-800 rounded-lg shadow-lg border border-amber-100 dark:border-gray-700 overflow-hidden w-full"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <motion.div
          className="bg-amber-100 dark:bg-gray-900 px-4 sm:px-6 py-5 sm:py-4 border-b border-amber-200 dark:border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-yellow-100 text-center font-serif tracking-wide"
            initial={false}
            animate={{ opacity: 1 }}
          >
            Dear Diary,
          </motion.h2>
        </motion.div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 px-2 xs:px-4 sm:px-8 py-7 sm:py-10 w-full"
        >
          <div className="flex flex-col gap-4 sm:gap-5 md:flex-row w-full">
            <input
              type="text"
              placeholder="Title of your day..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full md:w-auto px-4 py-3 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 font-semibold text-base sm:text-lg bg-white dark:bg-gray-900"
            />
            <input
              type="date"
              value={noteDate}
              onChange={(e) => setNoteDate(e.target.value)}
              required
              className="w-full md:w-auto px-4 py-3 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white dark:bg-gray-900"
            />
          </div>
          <textarea
            placeholder="Write your story, thoughts, or memories here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={8}
            className="w-full px-4 py-3 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none font-serif text-base sm:text-lg bg-white dark:bg-gray-900 shadow-inner"
            style={{ minHeight: 140 }}
          />
          {error && (
            <motion.div
              className="text-red-500 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-green-600 text-base text-center font-semibold">
                {success}
              </div>
              <Link
                to="/dashboard"
                className="text-amber-600 hover:underline font-medium"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded transition-colors text-base sm:text-lg shadow mt-2"
          >
            {loading ? "Saving..." : "Save to Diary"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Create;
