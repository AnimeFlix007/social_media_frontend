import React from "react";
import Sidebar from "../components/global/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Sidebar />
      {children}
    </React.Fragment>
  );
};

export default Layout;
