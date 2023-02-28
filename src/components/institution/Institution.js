import "./Institution.css";
import UserContext from "../../context/userContext/UserContext";
import { useContext, useState } from "react";
import NoWalletPage from "../connection/NoWalletPage";
import Connect from "../connection/Connect";
import KYC from "../kyc/kyc";
import CertDesigner from "./certDesigner";
import CertDataForm from "./certDataForm";
import ForwardIcon from "@mui/icons-material/Forward";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { fileDownload } from "../Scripts/tools";

import cert1 from "./assets/certificate1.png";
import cert2 from "./assets/certificate2.png";
import cert3 from "./assets/certificate3.png";
import cert4 from "./assets/certificate4.png";
import cert5 from "./assets/certificate5.png";
import badge1 from "./assets/badge1.jpg";
import badge2 from "./assets/badge2.jpg";
import badge3 from "./assets/badge3.jpg";
import badge4 from "./assets/badge4.jpg";

export const Institution = () => {
  const user = useContext(UserContext);
  const [isDesigner, setIsDesigner] = useState(false);
  const [isCertDataForm, setIsCertDataForm] = useState(false);

  const [certNumber, setCertNumber] = useState(0);
  const [certData, setCertData] = useState({});

  if (!user.iswalletAvailable) {
    return <NoWalletPage />;
  }

  if (!user.isConnected) {
    return <Connect />;
  }
  
  if (user.userData.status !== "Approved") {
    return <KYC />;
  }

  if (isDesigner) {
    return (
      <div className="institutepage">
        <CertDesigner setOpen={setIsDesigner} />
      </div>
    );
  }
  if (isCertDataForm) {
    return (
      <div className="institutepage">
        <CertDataForm
          setOpen={setIsCertDataForm}
          certNumber={certNumber}
          certData={certData}
        />
      </div>
    );
  }

  return (
    <div className="institutepage">
      <h1>Issue Certificates</h1>
      <div className="instituteLandingForm">
        <label htmlFor="template-selector">Select Template:</label>
        <select name="template-selector" id="template-selector">
          {Object.keys(user.userData.certificates).map((cert) => (
            <option
              value={user.userData.certificates[cert]["name"]}
              key={user.userData.certificates[cert]["name"]}
            >
              {user.userData.certificates[cert]["name"]}
            </option>
          ))}
        </select>
        <h3>Or</h3>
        <button onClick={() => setIsDesigner(true)}>
          Create New Template
          <DesignServicesIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
        </button>
        <label htmlFor="certificate-number-selector">
          No. of certificates:
        </label>
        <input
          type="number"
          id="certificate-number-selector"
          placeholder="Enter number"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
        />
        <h4>Enter individual values next</h4>
        <button
          onClick={() => {
            let certName = document.getElementById("template-selector").value;
            let certData = user.userData.certificates[certName];
            setCertData(certData);
            setIsCertDataForm(true);
          }}
        >
          Next
          <ForwardIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
        </button>
        <div style={{ marginTop: "50px" }}>
          <h2>Ready made templates</h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={cert1}
              alt="Certificate Template"
              width={200}
              height={150}
              onClick={() => fileDownload(cert1, "template")}
            />
            <img
              src={cert2}
              alt="Certificate Template"
              width={200}
              height={150}
              onClick={() => fileDownload(cert2, "template")}
            />
            <img
              src={cert3}
              alt="Certificate Template"
              width={200}
              height={150}
              onClick={() => fileDownload(cert3, "template")}
            />
            <img
              src={cert4}
              alt="Certificate Template"
              width={200}
              height={150}
              onClick={() => fileDownload(cert4, "template")}
            />
            <img
              src={cert5}
              alt="Certificate Template"
              width={200}
              height={150}
              onClick={() => fileDownload(cert5, "template")}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          borderBottom: "1px solid white",
          margin: "20px",
        }}
      ></div>

      <h1>Issue Badges</h1>
      <div className="instituteLandingForm">
        <label htmlFor="badge-selector">Select Badge:</label>
        <select name="template-selector" id="template-selector">
          {Object.keys(user.userData.certificates).map((cert) => (
            <option
              value={user.userData.certificates[cert]["name"]}
              key={user.userData.certificates[cert]["name"]}
            >
              {user.userData.certificates[cert]["name"]}
            </option>
          ))}
        </select>

        <label htmlFor="certificate-number-selector">No. of badges:</label>
        <input
          type="number"
          id="badge-number-selector"
          placeholder="Enter number"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
        />
        <h4>Enter individual values next</h4>
        <button
          onClick={() => {
            let certName = document.getElementById("template-selector").value;
            let certData = user.userData.certificates[certName];
            setCertData(certData);
            setIsCertDataForm(true);
          }}
        >
          Next
          <ForwardIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
        </button>

        <div style={{ marginTop: "50px" }}>
          <h2>Ready made templates</h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={badge1}
              alt="Certificate Template"
              width={400}
              height={150}
              onClick={() => fileDownload(badge1, "template")}
            />
            <img
              src={badge2}
              alt="Certificate Template"
              width={400}
              height={150}
              onClick={() => fileDownload(badge2, "template")}
            />
            <img
              src={badge3}
              alt="Certificate Template"
              width={400}
              height={150}
              onClick={() => fileDownload(badge3, "template")}
            />
            <img
              src={badge4}
              alt="Certificate Template"
              width={400}
              height={150}
              onClick={() => fileDownload(badge4, "template")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institution;
