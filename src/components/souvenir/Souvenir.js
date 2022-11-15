// import "../individual/Individual.css";
import "./Souvenir.css";
import fileselector from "../assets/fileselector.svg";
import SouvenirScript from "./SouvenirScript";
import Connect from "../connection/Connect";
import DND from "../Scripts/draganddrop/DND";
import {KYCform} from "./KYCform";
import { useNavigate } from "react-router-dom";
import fileWaiting from "./assets/icon-pending.png";

import React from "react";

export const Souvenir = () => {
  const navigate = useNavigate();
  const {
    user,
    uploadedImageURL,
    isDestination,
    destinationName,
    destinationDescription,
    destinationSouvenirNumber,
    isloading,
    status,
    saveImage,
    submit,
    isKYC
  } = SouvenirScript();

  if (!user.isConnected) {
    return <Connect />;
  }

  
  if(!user.isKYC){
    console.log(user.isKYC);
      if (!isDestination) {
        return ( 
          <div className="nowalletpage">
          <h2>You have to Complete Your KYC</h2>
          <p>click Next to for your KYC Process</p>
          <button
            onClick={() => {
              navigate("/kycform");
              
            }}
          >
            Next
          </button>
        </div>
          // <div className="individualpage">
          //   <h1>You have to do Your KYC</h1>
          //   <p>Contact us to get your prestigious organization registered.</p>
          //   <h2>Email us at support@beimagine.tech</h2>
          // </div>
        );
    }
  }else{
    if(user.kycStatus === "Pending"){
      return ( 
        <div className="nowalletpage">
            <div class="alert">
              <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
              <strong>Success!</strong> Successfully submitted KYC details.
          </div>
        <h2>Your KYC Status is {user.kycStatus} </h2>
        <img src={fileWaiting} alt="Please wait" />
      </div>
      );
    }else{
      
    }
    
  }


  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Welcome {destinationName}</h1>
        <div>{destinationDescription}</div>
        {destinationSouvenirNumber} Souvenirs issued so far.
        <h1>Give out Souvenirs</h1>
        <label htmlFor="individualfile">Upload Image*</label>
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
        <label htmlFor="souvenirname">Souvenir Name*</label>
        <input
          type="text"
          id="souvenirname"
          placeholder="Enter Souvenir Name"
        />
        <label htmlFor="recipientaddress">Recipient Wallet Address*</label>
        <input
          type="text"
          id="recipientaddress"
          placeholder="Enter Recipient Wallet Address"
        />
        <label htmlFor="description">Description*</label>
        <textarea name="description" id="description"></textarea>
        <div className="status">{status}</div>
        {!isloading && (
          <div className="whitebutton">
            <button
              onClick={() => {
                submit();
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Souvenir;
