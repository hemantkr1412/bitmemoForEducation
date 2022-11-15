import "./LearnMore.css";
import howtouseimage from "../home/assets/howtouseimage2.png";

import React from "react";

const DestinationInfo = () => {
  const Infotext = () => {
    return (
      <>
        <ol>
          <li>The destination shall contact us for issuing souvenirs.</li>
          <li>
            After vetting, BIT will deploy a smart contract for the destination.
          </li>
          <li>
            The destination shall provide an image frame which shall be applied
            on the souvenir pics automatically.
          </li>
          <li>BIT will add the destination as a verified souvenir issuer.</li>
          <li>
            The destination can then simply login to the BitMemoir web
            application with their wallet.
          </li>
          <li>
            The destination will be able to issue souvenirs by uploading their
            guest's picture (taken on the campus).
          </li>
          <li>
            The destination will acquire the wallet address of their guests and
            enter the guest's wallet address while issuing souvenirs. If the
            guests don't have a wallet address, the destination shall ask the
            guest to download the BIT-Wallet. BIT-Wallet will generate a wallet
            address for the guests.
          </li>
        </ol>
      </>
    );
  };
  return (
    <div className="learnmorepage">
      <div className="headingsection">
        <div className="heading">How to use BitMemoir</div>
        For hotels, resorts, events and travel destinations.
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

export default DestinationInfo;
