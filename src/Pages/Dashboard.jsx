import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabaseClient";
import { UserContext } from "../Auth";

const Dashboard = () => {
  // Support both { user, handleLogout } and direct user object from context
  const userCtx = useContext(UserContext);
  const user = userCtx?.user || userCtx;
  const displayName =
    user?.user_metadata?.display_name ||
    (user?.email ? user.email.split("@")[0] : "User");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    if (!user || !user.id) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("notes")
      .select("id, title, note_date, description, created_at")
      .eq("user_id", user.id)
      .order("note_date", { ascending: false });
    if (error) setError(error.message);
    else setNotes(data || []);
    setLoading(false);
  };

  // Always fetch notes when user.id changes (including after login)
  useEffect(() => {
    if (user && user.id) {
      fetchNotes();
    } else {
      setNotes([]);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [user?.id]);

  // Search filter
  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  // Delete note
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (!error) {
      await fetchNotes();
    } else {
      setError(error.message);
    }
  };

  // Start editing
  const handleEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditDate(note.note_date);
    setEditDesc(note.description);
  };

  // Save update
  const handleUpdate = async (id) => {
    const { error } = await supabase
      .from("notes")
      .update({ title: editTitle, note_date: editDate, description: editDesc })
      .eq("id", id);
    if (!error) {
      setEditId(null);
      await fetchNotes();
    } else {
      setError(error.message);
    }
  };

  // Read (expand/collapse)
  const [expanded, setExpanded] = useState(null);
  const handleRead = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-6 p-2 sm:p-4 w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center mb-6 sm:mb-8 gap-2 w-full"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-amber-700 dark:text-yellow-100 text-center font-serif tracking-wide"
          initial={false}
          animate={{ opacity: 1 }}
        >
          Welcome{" "}
          <span className="inline-block font-semibold">{displayName}</span> to
          your dashboard
        </motion.h2>
        <div className="w-full flex justify-center mt-3">
          <input
            type="text"
            placeholder="Search your diary by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full max-w-xs shadow-sm bg-white dark:bg-gray-900 text-base"
          />
        </div>
      </motion.div>
      {loading ? (
        <div className="text-center text-amber-500 font-semibold text-lg">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold text-lg">
          {error}
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center text-gray-500">No notes found.</div>
      ) : (
        <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 items-start w-full">
          <AnimatePresence>
            {filteredNotes.map((note, idx) => (
              <motion.div
                key={note.id}
                className="bg-gradient-to-br from-yellow-50 via-amber-100 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl p-4 sm:p-7 flex flex-col gap-2 border border-amber-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.025] hover:shadow-amber-200/40 dark:hover:shadow-yellow-200/10 group w-full"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 32px 0 rgba(251,191,36,0.10)",
                }}
              >
                {editId === note.id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 mb-2 text-lg font-semibold"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 mb-2"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows={6}
                      className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 mb-2 font-serif"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleUpdate(note.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded shadow"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded shadow"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                      <div className="w-full">
                        <div className="font-bold text-lg sm:text-xl text-amber-700 dark:text-yellow-200 font-serif group-hover:underline break-words">
                          {note.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {note.note_date}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                        <button
                          onClick={() => handleRead(note.id)}
                          className="flex-1 sm:flex-none min-w-[90px] bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-sm sm:text-base"
                        >
                          {expanded === note.id ? "Hide" : "Read"}
                        </button>
                        <button
                          onClick={() => handleEdit(note)}
                          className="flex-1 sm:flex-none min-w-[90px] bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow text-sm sm:text-base"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="flex-1 sm:flex-none min-w-[90px] bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm sm:text-base"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <motion.div
                      className={`transition-all duration-300 overflow-hidden ${
                        expanded === note.id
                          ? "max-h-96 opacity-100 mt-3"
                          : "max-h-0 opacity-0"
                      }`}
                      initial={false}
                      animate={{
                        opacity: expanded === note.id ? 1 : 0,
                        height: expanded === note.id ? "auto" : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line font-serif text-base bg-white/70 dark:bg-gray-900/70 rounded p-2 sm:p-3 shadow-inner">
                        {note.description}
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
