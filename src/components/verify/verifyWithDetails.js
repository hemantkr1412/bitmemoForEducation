import { useParams } from "react-router-dom";
import { verifyApi } from "../Scripts/apiCalls";
import { useState, useEffect } from "react";
import verifiedanim from "./assets/verified3.gif";
import { Verified } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { fileDownload } from "../Scripts/tools";
import DownloadIcon from "@mui/icons-material/Download";
import DangerousIcon from "@mui/icons-material/Dangerous";

const VerifyWithDetails = () => {
  const { contractAddress, tokenId } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [nftData, setNftData] = useState(null);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    verify();
  }, [tokenId, contractAddress]);

  const verify = async () => {
    setHasData(false);
    verifyApi({ contract_address: contractAddress, token_id: tokenId })
      .then((res) => {
        setHasData(true);
        if (res !== "Invalid data.") {
          setIsVerified(true);
          setUserData(res["user_data"]);
          setNftData(res["nft_data"]);
        } else {
          setIsVerified(false);
        }
      })
      .catch((err) => {
        setHasData(true);
        setIsVerified(false);
      });
  };

  if (!hasData) {
    return (
      <div className="verifypage">
        <div className="verifycontainer">
          <h1>Verifying...</h1>
          <CircularProgress size={200} />
        </div>
      </div>
    );
  }

  return (
    <div className="verifypage">
      <div className="verifycontainer">
        {isVerified ? (
          <>
            <VerifiedDetails userData={userData} nftData={nftData} />
          </>
        ) : (
          <>
            <h1 style={{ color: "red" }}>Could not Verify.</h1>
            <DangerousIcon color="error" style={{ fontSize: 200 }} />
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyWithDetails;

const VerifiedDetails = (props) => {
  const { userData, nftData } = props;
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setHasAnimated(true), 3500);
  });

  return (
    <div className="certDetails">
      {hasAnimated ? (
        <>
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Verified
            <Verified color="success" style={{ fontSize: 25 }} />
          </h1>
          <h2>Issued by:</h2>
          {userData["name"]}
          <span>{userData["description"]}</span>
          {userData["account"]}
          <h2>Recipient:</h2>
          {nftData["owner"]}
          {Object.keys(nftData).map((item) => {
            if (
              item !== "image" &&
              item !== "metadata_uri" &&
              item !== "owner"
            ) {
              return (
                <span key={item}>
                  {item}: {nftData[item]}
                </span>
              );
            } else return null;
          })}
          <img src={nftData["image"]} alt="" />
          <button
            onClick={() => {
              fileDownload(nftData["image"], "Certificate");
            }}
          >
            Download
            <DownloadIcon sx={{ fontSize: 20 }} />
          </button>
        </>
      ) : (
        <img src={verifiedanim} alt="BIT Verified" width={300} />
      )}
    </div>
  );
};
