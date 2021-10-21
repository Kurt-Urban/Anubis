import React from "react";
import { TopNav } from ".";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-vh-100 bg-darkest">
      <TopNav />
      {children}
    </div>
  );
};

export default Layout;
