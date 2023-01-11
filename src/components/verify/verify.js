import "./verify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";

const Verify = () => {
  const navigate = useNavigate();
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");

  const verify = () => {
    if (!ethers.utils.isAddress(contractAddress)) {
      alert("Invalid contract address!");
      return null;
    } else if (tokenId <= 0) {
      alert("Invalid token id!");
      return null;
    } else {
      navigate("/verify/" + contractAddress + "/" + tokenId);
    }
  };
  return (
    <div className="verifypage">
      <div className="verifycontainer">
        <h1>Verify Certificates</h1>
        <h3>Enter certificate details below.</h3>
        <h5>
          (Certificate details can be found on the certificate file along side
          the QR code.)
        </h5>
        <label htmlFor="contract-address-for-cert-verification">
          Contract Address:
        </label>
        <input
          type="text"
          id="contract-address-for-cert-verification"
          placeholder="Enter address. e.g. 0xbff6CbaE23f790826f4209438752bd269e63e8c5"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <label htmlFor="token-id-for-cert-verification">Token Id:</label>
        <input
          type="number"
          id="token-id-for-cert-verification"
          placeholder="Enter token id"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button style={{ marginTop: "50px" }} onClick={verify}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default Verify;
