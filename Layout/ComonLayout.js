import React from "react";
import Navbar from "@/components/Navbar";
const ComonLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default ComonLayout;
