import "./Footer.css";

import React from "react";

import linkedinlogo from "./assets/linkedinlogo.svg";
import instagramlogo from "./assets/instagramlogo.svg";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerborder"></div>
      <div className="footercontainer">
        <div className="footerlogocontainer">
          <img
            src="https://beimagine.tech/wp-content/uploads/2022/04/BITlogo-white.png"
            alt="BEYOND IMAGINATION TECHNOLOGIES"
          />
        </div>

        <div className="contactcontainer">
          Contact us:
          <div>support@beimagine.tech</div>
          <div className="socialcontainer">
            <img
              src={linkedinlogo}
              alt=""
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/company/beyond-imagination-technlogies-pvt-ltd/?viewAsMember=true"
                );
              }}
            />
            <img
              src={instagramlogo}
              alt=""
              onClick={() => {
                window.open("https://www.instagram.com/bitindiaofficial/");
              }}
            />
          </div>
        </div>
      </div>
      <div className="copyrightcontainer">
        Copyright © 2022 Beyond Imagination Technologies Pvt. Ltd. All right
        reserved.
      </div>
    </div>
  );
};

export default Footer;
