import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Login />} />
      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
