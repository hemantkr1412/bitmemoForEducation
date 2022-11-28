import "./Institution.css";
import certificate1 from "./assets/certificate1.png";
import certificate2 from "./assets/certificate2.png";
import certificate3 from "./assets/certificate3.png";
import certificate4 from "./assets/certificate4.png";
import certificate5 from "./assets/certificate5.png";
import UserContext from "../../context/userContext/UserContext";
import { useContext } from "react";
import NoWalletPage from "../connection/NoWalletPage";
import Connect from "../connection/Connect";
import KYC from "../kyc/kyc";

export const Institution = () => {
  const user = useContext(UserContext);

 if (!user.iswalletAvailable) {
    return <NoWalletPage />;
  }

  if (!user.isConnected) {
    return <Connect />;
  }

  if (user.userData.status !== "Approved") {
    return <KYC />;
  }



  return (
    <div className="institutepage">
      <div className="heading">
        Please contact us to issue certificates in bulk.
      </div>
      <div className="emailfield">Email: support@beimagine.tech</div>
      <div className="samplecertificates">
        <div className="heading">Sample Certificates:</div>
        <div className="certificatecontainer">
          <img src={certificate1} alt="Sample certificate" />
          <img src={certificate2} alt="Sample certificate" />
          <img src={certificate3} alt="Sample certificate" />
          <img src={certificate4} alt="Sample certificate" />
          <img src={certificate5} alt="Sample certificate" />
        </div>
      </div>
    </div>
  );
};

export default Institution;
