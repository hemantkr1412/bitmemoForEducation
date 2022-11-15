import React from "react";
import "./admin.css";
import { useState, useContext } from "react";
import { addDestination } from "../Scripts/apiCalls";
import UserContext from "../../context/userContext/UserContext";

export const AddHotelPage = () => {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [frame, setFrame] = useState(null);

  return (
    <div className="addAdmin">
      <h2>Add Destination</h2>
      <div className="adminPageForm">
        <label htmlFor="Hotelname">Name :</label>
        <input type="text" id="Hotelname" placeholder="Enter name" />
      </div>
      <div className="adminPageForm">
        <label htmlFor="Hoteldescription">Description :</label>
        <input
          type="text"
          id="Hoteldescription"
          placeholder="Enter description"
        />
      </div>
      <div className="adminPageForm">
        <label htmlFor="Hoteladdress">Address :</label>
        <input
          type="text"
          id="Hoteladdress"
          placeholder="Enter wallet address"
        />
      </div>
      <div className="adminPageForm">
        <label htmlFor="Hotelframe">Frame :</label>
        <input
          type="file"
          id="Hotelframe"
          onChange={(e) => {
            setFrame(e.target.files[0]);
          }}
        />
      </div>
      {status}
      <button
        onClick={async () => {
          setStatus("adding destination...");
          let name = document.getElementById("Hotelname").value;
          let description = document.getElementById("Hoteldescription").value;
          let account = document.getElementById("Hoteladdress").value;
          let addedBy = user.userAccount;
          if (account == "" || addedBy == "") {
            setStatus("Address can not be empty.");
            return;
          } else {
            await addDestination(
              name,
              description,
              account,
              frame,
              addedBy
            ).then((res) => {
              if (res === "Server error") {
                setStatus("Server error");
              } else if (res.status === "Success") {
                setStatus("Destination added successfully.");
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

export default AddHotelPage;
