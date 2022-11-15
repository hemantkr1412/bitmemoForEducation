import React from 'react';
import "./Souvenir.css";
import SouvenirScript from "./SouvenirScript";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext/UserContext';
import { useContext } from 'react';
import DND from '../Scripts/draganddrop/DND';


export const KYCform = () => {
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
    setInput,
  } = SouvenirScript();
  const user1 = useContext(UserContext);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    user1.setIsKYC(true);
     submit().then((res) => {
      if (res.status === "Success") {
        navigate("/souvenir");
      }
    });
  };

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Enter Your KYC Details</h1>
        <label htmlFor="name">Name of the Company*</label>
        <input type="text" id="name" name='name' onChange={handleChange} placeholder='Name of the Company'/>
        <label htmlFor="email">Official Website*</label>
        <input type="email" id="email" name='website' placeholder='Official Website' onChange={handleChange}/>
        <label htmlFor="Official website">Official email ID*</label>
        <input type="text" id="phone_num" name='email' placeholder='Official email ID' onChange={handleChange}/>
        <label htmlFor="website">Phone number*</label>
        <input type="text" id="website" name='phone' placeholder='Phone number'onChange={handleChange}/>
        <label htmlFor="website">CIN*</label>
        <input type="text" id="website" name='CIN' placeholder='CIN'onChange={handleChange}/>
        <label htmlFor="website">Name of ID proof of representative*</label>
        <input type="text" id="website" placeholder='Name of ID proof of representative' name="IdProof" onChange={handleChange}/>    
        <label htmlFor="fileselectorinput">ID proof of representative*</label>
        <input
          type="file"
          id="fileselectorinput"
          style={{ display: "none" }}
          onChange={(e) => {
            saveImage(e.target.files[0]);
          }}
        />
        <DND uploadedImageURL={uploadedImageURL} saveImage={saveImage}  />
        <div className="status">{status}</div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
