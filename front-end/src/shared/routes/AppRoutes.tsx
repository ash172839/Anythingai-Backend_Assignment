import { Route, Routes } from "react-router-dom";
import Login from "../../modules/user/pages/Login";
import Register from "../../modules/user/pages/Register";
import Dashboard from "../../modules/Assignment/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

     
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
