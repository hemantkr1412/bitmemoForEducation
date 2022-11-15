import React from "react";
import AdminPage from "./adminPage";
import UserContext from "../../context/userContext/UserContext";
import { useContext, useState, useEffect } from "react";
import Connect from "../connection/Connect";
export const Admin = () => {
  const user = useContext(UserContext);

  return (
    <div className="adminPage">
      {user.isConnected ? <AdminPage /> : <Connect />}
    </div>
  );
};

export default Admin;
