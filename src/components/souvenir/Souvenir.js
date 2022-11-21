// import "../individual/Individual.css";
import "./Souvenir.css";
import fileselector from "../assets/fileselector.svg";
import SouvenirScript from "./SouvenirScript";
import Connect from "../connection/Connect";
import DND from "../Scripts/draganddrop/DND";
import {KYCform} from "./KYCform";
import { useNavigate } from "react-router-dom";
import fileWaiting from "./assets/icon-pending.png";
import { useEffect } from "react";


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
          <p>Click on Next to Apply KYC</p>
          <button
            onClick={() => {
              navigate("/kycform");
              
            }}
          >
            Next
          </button>
        </div>
        );
    }
  }else{

    if(user.kycStatus === "in_progress" ){
      return ( 
        <div className="nowalletpage">
          <div class="alert">
              <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
              <strong>Success!</strong> Successfully submitted KYC details.
          </div>
        <h2>Your KYC Status is Pending </h2>
        <img src={fileWaiting} alt="Please wait" />
      </div>
      );

    }else if(user.kycStatus === "Revoke"){
      return ( 
        <div className="nowalletpage">
        <h2>Sorry ! Your are Blacklisted </h2>
        <p >Reason : {user.comment}</p>
        <h2>Email us at support@beimagine.tech</h2>
      </div>
      );
    }
    else if(user.kycStatus === "Rejected"){
      return ( 
        <div className="nowalletpage">
          <h2>Sorry ! Your KYC has been Rejected </h2>
          <p>Reason : {user.comment}</p>
          <p>Click on Button to Reapply KYC</p>
          <button
              onClick={() => {
                navigate("/kycform");
                
              }}
            >
              Reapply
          </button>
      </div>
      );
    }
    else{

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
      
    }
    
  }

  
};
export default Souvenir;
