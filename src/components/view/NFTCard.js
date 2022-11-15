import React from "react";
import "./View.css";
import downloadbutton from "../assets/downloadbutton.svg";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/userContext/UserContext";
import { getCertificates, getIssuerDetails } from "../Scripts/apiCalls";
import { fileDownload } from "../Scripts/tools";
import verified from "../assets/verified.svg";

export const NFTCard = (props) => {
  const user = useContext(UserContext);
  const [issuer, setIssuer] = useState("Verified Issuer");
  useEffect(() => {
    getIssuerName(props.category);
  }, []);
  const getIssuerName = async (address) => {
    if (address === user.userAccount) {
      setIssuer("Personal Files");
      return;
    }
    await getIssuerDetails(address)
      .then((res) => {
        if (res.status != "Server error") {
          if (res.status === "Success") {
            setIssuer(res.credentials.name);
          } else {
            setIssuer("Verified issuer");
          }
        } else {
          setIssuer("Verified issuer");
        }
      })
      .catch((err) => {
        setIssuer("Verified issuer");
      });
  };
  return (
    <>
      <div className="carouselheading">{issuer}</div>
      <div className="nftcarousel">
        {props.nfts.map((nft) => {
          return (
            <div className="carouselcard" key={nft.name + nft.description}>
              <div className="carouselcardimage">
                <img src={nft.file_url} alt={nft.name} />
              </div>
              <div className="carouselcardtitle">{nft.name}</div>
              <div className="carouselcardtext">{nft.description}</div>
              <div className="downloadbutton">
                <img
                  src={downloadbutton}
                  alt="download nft"
                  onClick={() => {
                    fileDownload(nft.file_url, nft.name);
                  }}
                />
              </div>
              {nft.is_verified && (
                <div className="verifiedlogo">
                  <img src={verified} alt="BIT Verified" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
