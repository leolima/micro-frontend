import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import useStore from "StoreApp/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import "./app.css";

const HomePage = React.lazy(() => import("HomeApp/HomePage"));
const ContactPage = React.lazy(() => import("ContactApp/ContactPage"));
const DashboardPage = React.lazy(() => import("./external/Dashboard"));

const App = () => {
  const { user } = useStore();

  return (
    <div>
      <Header />
      <Routes>
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<div>Loading ...</div>}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading ...</div>}>
              <ProtectedRoute user={user} ><DashboardPage user={user} teste="testando" /></ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/contact"
          element={
            <Suspense fallback={<div>Loading ...</div>}>
              <ContactPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
