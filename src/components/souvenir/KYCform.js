import React from 'react';
import "./Souvenir.css";
import SouvenirScript from "./SouvenirScript";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext/UserContext';
import { useContext } from 'react';
import DND from '../Scripts/draganddrop/DND';
import { kycApply ,updateKYC} from '../Scripts/apiCalls';

export const KYCform = () => {
  const navigate = useNavigate();
  const {
    user,
    uploadedImage,
    uploadedImageURL,
    isDestination,
    destinationName,
    destinationDescription,
    destinationSouvenirNumber,
    isloading,
    status,
    saveImage,
    submit,
    input,
    setInput,
  } = SouvenirScript();
  const user1 = useContext(UserContext);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  // console.log(input);

  const handleSubmit = (e) => {
    console.log(input);
    user1.setIsKYC(true);
     submit().then((res) => {
      if (res.status === "Success") {
        if(user1.kycStatus === "in_progress"){
        kycApply(input.name,user.userAccount,input.website,input.email,input.phone,input.CIN,uploadedImage,
          
          ).then((res) => {
          if (res.status === "Success") {
            navigate("/souvenir");
          }
        });
      }else{
        updateKYC(input.name,input.website,input.email,input.phone,input.CIN,uploadedImage,)
        .then((res) => {
          if (res.status === "Success") {
            navigate("/souvenir");
          }
        });
      }

      }
    });
  };
  

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Enter Your KYC Details</h1>
        <label htmlFor="name">Name of the Company*</label>
        <input type="text" id="name" value={input.name} name='name' onChange={handleChange} placeholder='Name of the Company'/>
        <label htmlFor="email">Official Website*</label>
        <input type="email" id="email" value={input.website} name='website' placeholder='Official Website' onChange={handleChange}/>
        <label htmlFor="Official website">Official email ID*</label>
        <input type="text" id="phone_num" value={input.email} name='email' placeholder='Official email ID' onChange={handleChange}/>
        <label htmlFor="website">Phone number*</label>
        <input type="text" id="website" name='phone' value={input.phone} placeholder='Phone number'onChange={handleChange}/>
        <label htmlFor="website">CIN*</label>
        <input type="text" id="website" name='CIN' value={input.CIN} placeholder='CIN'onChange={handleChange}/>
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
