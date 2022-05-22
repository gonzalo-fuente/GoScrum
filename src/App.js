import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import RequireAuth from "./components/RequireAuth/RequireAuth";
import CircleLoader from "./components/CircleLoader/CircleLoader";
import Login from "./components/views/auth/Login/Login";
import Register from "./components/views/auth/Register/Register";
import Registered from "./components/views/auth/Registered/Registered";
import Tasks from "./components/views/Tasks/Tasks";

import "./App.css";

/* Lazy Import */
const NotFound = lazy(() => import("./components/views/NotFound/NotFound"));

const pageTransition = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={pageTransition}
            >
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={pageTransition}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/registered/:teamID"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={pageTransition}
            >
              <Registered />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={pageTransition}
            >
              <Suspense fallback={<CircleLoader />}>
                <NotFound />
              </Suspense>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
