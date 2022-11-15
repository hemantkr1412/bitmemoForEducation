import React from "react";
import { useState, useEffect, useContext } from "react";
import "./admin.css";
import AddAdminPage from "./addAdminPage";
import AddIssuerPage from "./addIssuerPage";
import { checkAdmin } from "../Scripts/apiCalls";
import AddHotelPage from "./addHotelPage";
import { UserDetails } from "./UserDetails";
import UserContext from "../../context/userContext/UserContext";

export const AdminPage = () => {
  const user = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(true);
  const [status, setStatus] = useState("Checking credentials...");

  useEffect(() => {
    checkAdminCredentials();
  }, [user]);

  const checkAdminCredentials = async () => {
    setStatus("Checking credentials");
    await checkAdmin(user.userAccount)
      .then((res) => {
        if (res.status === "Success") {
          setIsAdmin(true);
          setStatus(
            "Welcome " +
              res.credentials.name +
              " (" +
              res.credentials.designation +
              ")"
          );
          setIsAdmin(true);
        } else if (res.status === "Failed") {
          setStatus("Please connect with an admin account.");
        } else if (res === "Server error") {
          setStatus("Server error.");
        }
      })
      .catch((err) => {
        setStatus("Server error.");
      });
  };

  return (
    <div className="adminpage">
      {/* {status} */}
      {isAdmin && (
        <div className="adminTabs">
          {/* <AddHotelPage />
          <AddIssuerPage /> */}
          <AddAdminPage />
          <UserDetails />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
