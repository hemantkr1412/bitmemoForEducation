import "./LearnMore.css";
import howtouseimage from "../home/assets/howtouseimage3.png";

import React from "react";

const Individualinfo = () => {
  const infotext =
    " Individual users can simply go to the BitMemoir web application, sign-in with a blockchain wallet and start uploading their files. The uploaded files can be viewed or downloaded from the BitMemoir web application.";
  return (
    <div className="learnmorepage">
      <div className="headingsection">
        <div className="heading">How to use BitMemoir</div>
        For Individuals
      </div>
      <div className="infosection">
        <div className="infotext">{infotext}</div>
        <img src={howtouseimage} alt="How to use BitMemoir" />
      </div>
      <div className="infosectionmobile">
        <img src={howtouseimage} alt="How to use BitMemoir" />
        <div className="infotext">{infotext}</div>
      </div>
    </div>
  );
};

export default Individualinfo;
