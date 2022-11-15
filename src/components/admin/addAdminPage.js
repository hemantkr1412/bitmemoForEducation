import React from "react";
import "./admin.css";
import { useState, useContext } from "react";
import { addAdmin } from "../Scripts/apiCalls";
import UserContext from "../../context/userContext/UserContext";
export const AddAdminPage = () => {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");

  return (
    <div className="addAdmin">
      <h2>Add admin</h2>
      <div className="adminPageForm">
        <label htmlFor="name">Name :</label>
        <input type="text" id="name" placeholder="Enter name" />
      </div>
      <div className="adminPageForm">
        <label htmlFor="designation">Designation :</label>
        <input type="text" id="designation" placeholder="Enter designation" />
      </div>
      <div className="adminPageForm">
        <label htmlFor="address">Address :</label>
        <input type="text" id="address" placeholder="Enter wallet address" />
      </div>
      <p id="addAdminStatus">{status}</p>
      <button
        onClick={async () => {
          setStatus("adding admin...");
          let name = document.getElementById("name").value;
          let designation = document.getElementById("designation").value;
          let account = document.getElementById("address").value;
          let addedBy = user.userAccount;
          if (account == "" || addedBy == "") {
            setStatus("User account can not be empty.");
            return;
          } else {
            await addAdmin(name, designation, account, addedBy).then((res) => {
              if (res === "Server error") {
                setStatus("Server error");
              } else if (res.status === "Success") {
                setStatus("Admin added successfully.");
              } else {
                setStatus(res.response);
              }
            });
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddAdminPage;
