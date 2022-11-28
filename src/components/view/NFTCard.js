import React from "react";
import "./View.css";
import downloadbutton from "../assets/downloadbutton.svg";
import { fileDownload } from "../Scripts/tools";
import verified from "../assets/verified.svg";

export const NFTCard = (props) => {
  return (
    <>
      <div className="carouselheading">{props.category}</div>
      <div className="nftcarousel">
        {props.nfts.map((nft) => {
          return (
            <div className="carouselcard" key={nft.name + nft.description}>
              <div className="carouselcardimage">
                <img src={nft.image} alt={nft.name} />
              </div>
              <div className="carouselcardtitle">{nft.name}</div>
              <div className="carouselcardtext">{nft.description}</div>
              <div className="downloadbutton">
                <img
                  src={downloadbutton}
                  alt="download nft"
                  onClick={() => {
                    fileDownload(nft.image, nft.name);
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
