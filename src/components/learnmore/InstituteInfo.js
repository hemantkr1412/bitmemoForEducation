import "./LearnMore.css";
import howtouseimage from "../home/assets/howtouseimage1.png";

import React from "react";

const InstituteInfo = () => {
  const Infotext = () => {
    return (
      <>
        <ol>
          <li>The institute shall contact us for issuing certificates.</li>
          <li>BIT will vet the institute by demanding legal paperwork.</li>
          <li>
            After vetting, BIT will deploy a smart contract for the institute.
          </li>
          <li>
            The institute shall provide the content of the certificate. The
            template of the certificate along with the dynamic entries and a
            list of certificate recipients along with their wallet addresses.
            BIT will help the institute by providing certificate templates and
            data formats.
          </li>
          <li>
            BIT will create the certificates, mint an NFT for each certificate
            and transfer the ownership to the recipient.
          </li>
          <li>
            The recipients can view or download their certificates at the
            BItMemoir web application or BIT-Wallet.
          </li>
        </ol>
      </>
    );
  };

  return (
    <div className="learnmorepage">
      <div className="headingsection">
        <div className="heading">How to use BitMemoir</div>
        For educational institutions including schools, colleges, and
        universities.
      </div>
      <div className="infosection">
        <div className="infotext">
          <Infotext />
        </div>
        <img src={howtouseimage} alt="How to use BitMemoir" />
      </div>
      <div className="infosectionmobile">
        <img src={howtouseimage} alt="How to use BitMemoir" />
        <div className="infotext">
          <Infotext />
        </div>
      </div>
    </div>
  );
};

export default InstituteInfo;
