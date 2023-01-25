import DownloadIcon from "@mui/icons-material/Download";
import { useState, useContext, useEffect } from "react";
import { nftApi } from "../Scripts/apiCalls";
import UserContext from "../../context/userContext/UserContext";
import { fileDownload } from "../Scripts/tools";
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";

const CertDataFormRow = (props) => {
  const user = useContext(UserContext);
  const { sno, certData } = props;
  const [variable1, setvariable1] = useState("");
  const [variable2, setvariable2] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [rowStyle, setRowStyle] = useState("1fr 3fr 3fr 4fr 1fr 1fr");

  useEffect(() => {
    let isAddressValid = true;
    try {
      isAddressValid = ethers.utils.getAddress(walletAddress);
      setIsValid(true);
    } catch {
      isAddressValid = false;
      setIsValid(false);
    }

    if (certData["variable2"] === "" && certData["variable1"] === "")
      setRowStyle("1fr 4fr 4fr 1fr 1fr");
    else if (certData["variable2"] === "" || certData["variable1"] === "")
      setRowStyle("1fr 3fr 4fr 4fr 1fr 1fr");
    else setRowStyle("1fr 3fr 3fr 4fr 4fr 1fr 1fr");
  }, [walletAddress]);

  const uploadImage = (requestType) => {
    setIsUploading(true);
    nftApi({
      account: user.userAccount,
      recipient: walletAddress,
      cert: requestType,
      template: certData["name"],
      variable1: variable1,
      variable2: variable2,
      email: email,
    })
      .then(async (res) => {
        if (requestType === "download") {
          fileDownload(res, "sample");
        }
        setIsUploading(false);
      })
      .catch((err) => {
        setIsUploading(false);
      });
  };

  return (
    <>
      <div
        className="certDataFormContainer"
        style={{ gridTemplateColumns: rowStyle }}
      >
        <h3>{sno + 1}</h3>
        {certData["variable1"] !== "" && (
          <input
            type="text"
            value={variable1}
            id={"variable-1-input-for-row-" + sno}
            onChange={(e) => {
              setvariable1(e.target.value);
            }}
          />
        )}

        {certData["variable2"] !== "" && (
          <input
            type="text"
            id={"variable-2-input-for-row-" + sno}
            value={variable2}
            onChange={(e) => setvariable2(e.target.value)}
          />
        )}
        <input
          type="text"
          id={"address-input-for-row-" + sno}
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="text"
          id={"email-input-for-row-" + sno}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isValid ? (
          <>
            {isUploading ? (
              <CircularProgress />
            ) : (
              <button
                style={{ padding: "0px", height: "40px" }}
                onClick={() => {
                  uploadImage("issue");
                }}
              >
                Issue
              </button>
            )}
          </>
        ) : (
          <></>
        )}

        {isUploading ? (
          <CircularProgress />
        ) : (
          <button
            style={{ padding: "0px", height: "40px", width: "75px" }}
            onClick={() => {
              uploadImage("download");
            }}
          >
            <DownloadIcon />
          </button>
        )}
      </div>
    </>
  );
};

export default CertDataFormRow;
