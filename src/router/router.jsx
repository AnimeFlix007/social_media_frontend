import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/Home";
import ProfileDetail from "../pages/profile/ProfileDetail";
import { useDispatch, useSelector } from "react-redux";
import { authRefreshToken } from "../context/slice/authSlice";
import Layout from "../layout/Layout";
import SearchedUsers from "../pages/SearchedUsers";
import Profile from "../pages/profile/Profile";

const Router = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.access_token) {
      dispatch(authRefreshToken());
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          user?.access_token ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
      <Route
        path="/search"
        element={
          user?.access_token ? (
            <Layout>
              <SearchedUsers />
            </Layout>
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
      <Route
        path="/discover"
        element={
          user?.access_token ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
      <Route
        path="/notification"
        element={
          user?.access_token ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
      <Route
        path="/likes"
        element={
          user?.access_token ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
      <Route
        path="/profile"
        element={
          user?.access_token ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
      <Route
        path="/profile/:id"
        element={
          user?.access_token ? (
            <Layout>
              <ProfileDetail />
            </Layout>
          ) : (
            <Navigate to={"/auth"} replace />
          )
        }
      />
      <Route
        path="/auth"
        element={
          !user?.access_token ? <Login /> : <Navigate to={"/"} replace />
        }
      />
      <Route path={"*"} element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
