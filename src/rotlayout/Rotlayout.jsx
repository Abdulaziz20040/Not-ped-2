import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";

function Rotlayout() {
  return (
    <div>
      <Home />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Rotlayout;
