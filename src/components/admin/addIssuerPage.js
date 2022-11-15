import React from "react";
import "./admin.css";
import { useState, useContext } from "react";
import { addIssuer } from "../Scripts/apiCalls";
import UserContext from "../../context/userContext/UserContext";
export const AddIssuerPage = () => {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");

  return (
    <div className="addAdmin">
      <h2>Add issuer</h2>
      <div className="adminPageForm">
        <label htmlFor="Issuername">Name :</label>
        <input type="text" id="Issuername" placeholder="Enter name" />
      </div>
      <div className="adminPageForm">
        <label htmlFor="Issuerdescription">Description :</label>
        <input
          type="text"
          id="Issuerdescription"
          placeholder="Enter description"
        />
      </div>
      <div className="adminPageForm">
        <label htmlFor="Issueraddress">Address :</label>
        <input
          type="text"
          id="Issueraddress"
          placeholder="Enter wallet address"
        />
      </div>
      {status}
      <button
        onClick={async () => {
          setStatus("adding institute...");
          let name = document.getElementById("Issuername").value;
          let description = document.getElementById("Issuerdescription").value;
          let account = document.getElementById("Issueraddress").value;
          let addedBy = user.userAccount;
          if (account == "" || addedBy == "") {
            setStatus("Issuer address can not be empty.");
            return;
          } else {
            await addIssuer(name, description, account, addedBy).then((res) => {
              if (res === "Server error") {
                setStatus("Server error");
              } else if (res.status === "Success") {
                setStatus("Issuer added successfully.");
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

export default AddIssuerPage;
