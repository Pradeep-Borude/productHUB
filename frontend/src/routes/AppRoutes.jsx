import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import HomePage from "../pages/general/home";
import UserProfile from "../pages/general/UserProfile";
import AddProduct from "../pages/general/addItem";
import EditProduct from "../pages/general/editItem";
import UserProtectedRoute from "../middleware/UserProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Public */}
        <Route path="/" element={<HomePage />} />

        {/* User */}
        <Route path="/user/profile" element={
          <UserProtectedRoute>
            <UserProfile />
          </UserProtectedRoute>
          } />

        {/* Products */}
        <Route path="/products/add" element={
          <UserProtectedRoute>
            <AddProduct />
          </UserProtectedRoute>
          } />
        <Route path="/products/edit/:productId" element={
          <UserProtectedRoute>
            <EditProduct />
          </UserProtectedRoute>
          } />



        
      </Routes>

      



      
    </Router>








  );
};

export default AppRoutes;
