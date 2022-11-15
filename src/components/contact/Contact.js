import "./Contact.css";
import linkedinlogo from "../footer/assets/linkedinlogo.svg";
import instagramlogo from "../footer/assets/instagramlogo.svg";

import React from "react";

const Contact = () => {
  return (
    <div className="contactpage">
      Reach out to us at:
      <h2>Email: support@beimagine.tech</h2>
      <h2>Check out our social:</h2>
      <div className="contactsocialcontainer">
        <img
          src={linkedinlogo}
          alt=""
          height="100"
          width="100"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/company/beyond-imagination-technlogies-pvt-ltd/?viewAsMember=true"
            );
          }}
        />
        <img
          src={instagramlogo}
          alt=""
          height="130"
          width="130"
          onClick={() => {
            window.open("https://www.instagram.com/bitindiaofficial/");
          }}
        />
      </div>
    </div>
  );
};

export default Contact;
