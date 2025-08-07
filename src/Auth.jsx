import React, { useState, createContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.js";

export const UserContext = createContext(null);

const Auth = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [signupPending, setSignupPending] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
      }
      setCheckingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSignupPending(false);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
      },
    });
    if (error) {
      setError(error.message);
      alert(error.message);
      setLoading(false);
    } else {
      setSignupPending(true);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/", { replace: true });
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-2 sm:px-4">
        <motion.svg
          className="animate-spin h-10 w-10 text-amber-500 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </motion.svg>
      </div>
    );
  }

  if (!user) {
    if (signupPending) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <motion.div
            className="flex flex-col items-center gap-6 bg-white/80 dark:bg-gray-800/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-amber-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.svg
              className="animate-spin h-10 w-10 text-amber-500 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              initial={false}
              animate={{ opacity: 1 }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </motion.svg>
            <h2 className="text-xl font-bold text-amber-600 dark:text-yellow-100 text-center">
              Confirmation Required
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-center">
              A confirmation link has been sent to your email.
              <br />
              Please check your inbox and confirm your account to continue.
            </p>
          </motion.div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Glowing Title */}
        <motion.h1
          className="text-4xl font-extrabold mb-6 text-center text-amber-500 dark:text-yellow-200 tracking-wider select-none transition duration-300 hover:text-amber-400 hover:[text-shadow:0_0_16px_rgba(251,191,36,0.8)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{
            scale: 1.04,
            textShadow: "0px 0px 24px rgba(251,191,36,0.9)",
          }}
        >
          My Diary
        </motion.h1>
        <motion.form
          className="bg-white/80 dark:bg-gray-800/90 p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm flex flex-col gap-5 border border-amber-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl font-bold text-amber-600 dark:text-yellow-100 mb-2 text-center tracking-wide"
            initial={false}
            animate={{ opacity: 1 }}
          >
            Login to My Diary
          </motion.h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white dark:bg-gray-900 font-semibold text-base shadow-sm transition-all duration-200 text-white placeholder-gray-400"
            style={{ color: "white" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white dark:bg-gray-900 font-semibold text-base shadow-sm transition-all duration-200 text-white placeholder-gray-400"
            style={{ color: "white" }}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white dark:bg-gray-900 font-semibold text-base shadow-sm transition-all duration-200 text-white placeholder-gray-400 w-full pr-10"
              style={{ color: "white" }}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && (
            <motion.div
              className="text-red-500 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          <div className="flex gap-4 mt-2">
            <motion.button
              type="submit"
              onClick={handleLogin}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex-1 shadow-md hover:shadow-lg focus:ring-2 focus:ring-amber-400"
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Logging in..." : "Login (Old User)"}
            </motion.button>
            <motion.button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex-1 shadow-md hover:shadow-lg focus:ring-2 focus:ring-green-400"
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Signing up..." : "Signup (New User)"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, handleLogout }}>
      <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>
    </UserContext.Provider>
  );
};

export default Auth;
