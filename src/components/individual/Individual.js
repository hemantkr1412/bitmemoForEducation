import "./Individual.css";
import fileselector from "../assets/fileselector.svg";
import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
import Connect from "../connection/Connect";
import IndividualScript from "./IndividualScript";
import DND from "../Scripts/draganddrop/DND";

export const Individual = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const {
    status,
    isUploading,
    uploadedImageURL,
    storageLimit,
    storageUsed,
    saveImage,
    submitHandler,
  } = IndividualScript();

  useEffect(() => {
    if (!user.iswalletAvailable) {
      navigate("/wallet");
    }
  }, []);

  if (!user.isConnected) {
    return <Connect />;
  }

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Create Your Digital Certificate</h1>
        {Math.round((storageUsed / 1024) * 100) / 100} GB used out of{" "}
        {Math.round((storageLimit / 1024) * 100) / 100} GB
        <label htmlFor="fileselectorinput">Upload Image*</label>
        <input
          type="file"
          id="fileselectorinput"
          style={{ display: "none" }}
          onChange={(e) => {
            saveImage(e.target.files[0]);
          }}
        />
        {/* <div
          className="fileselector"
          style={{
            backgroundImage: "url('" + uploadedImageURL + "')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onClick={() => {
            document.getElementById("fileselectorinput").click();
          }}
        >
          <img src={fileselector} alt="Upload File" />
          Drag &amp; Drop File here
          <div>or</div>
          <button
            onClick={() => {
              document.getElementById("fileselectorinput").click();
            }}
          >
            Browse Files
          </button>
        </div> */}
        <DND uploadedImageURL={uploadedImageURL} saveImage={saveImage} />
        <label htmlFor="assetname">Asset Name*</label>
        <input type="text" id="assetname" placeholder="Enter Asset Name" />
        <label htmlFor="description">Description*</label>
        <textarea name="description" id="description"></textarea>
        <div className="status">{status}</div>
        <div className="whitebutton">
          {!isUploading && (
            <button
              onClick={() => {
                let assetname = document.getElementById("assetname").value;
                let assetdescription =
                  document.getElementById("description").value;
                submitHandler(assetname, assetdescription);
              }}
            >
              Submit
            </button>
          )}
        </div>
        <div className="instructiontext">
          Note: As per instructions issued by Government of India from time to
          time, it is advised not to upload your government issued
          identification such as Aadhaar card, PAN card, etc. on BitMemoir.
          Beyond Imagination Technologies Private Limited and its associated
          personnnel will not be liable or responsible for misuse of such
          critical personal information at any point in time.
        </div>
      </div>
    </div>
  );
};
export default Individual;
