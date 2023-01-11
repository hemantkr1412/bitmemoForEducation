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
      </div>
    </div>
  );
};

export default Institution;
