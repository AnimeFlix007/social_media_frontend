import React from "react";
import Sidebar from "../components/global/Sidebar";
import BottomNavigation from "../components/global/BottomNavigation";

const Layout = ({ children }) => {
  
  return (
    <React.Fragment>
      <Sidebar />
      {children}
      <BottomNavigation />
    </React.Fragment>
  );
};

export default Layout;
