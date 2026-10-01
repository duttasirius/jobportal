import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/ui/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

import Companies from "./components/adminPage/Companies";
import CreateCompany from "./components/adminPage/CreateCompany";
import CompanySetUp from "./components/adminPage/CompanySetUp";
import AdminJob from "./components/adminPage/AdminJob";
import PostJob from "./components/adminPage/PostJob";
import Applicants from "./components/adminPage/Applicants";
import ProtectedRoute from "./components/adminPage/ProtectedRoute";

const appRouter = createBrowserRouter([
  // Authentication
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  // Public Routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },

  // Admin Routes
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CreateCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetUp />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
