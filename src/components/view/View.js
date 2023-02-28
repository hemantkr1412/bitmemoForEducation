import "./View.css";
import React from "react";

import Connect from "../connection/Connect";
import ViewScript from "./ViewScript";
import { NFTCard } from "./NFTCard";
import NoWalletPage from "../connection/NoWalletPage";

const View = () => {
  const { status, certificateData, user, navigate } = ViewScript();

  if (!user.iswalletAvailable) {
    return <NoWalletPage />;
  }

  if (!user.isConnected) {
    return <Connect />;
  }

  const NFTData = () => {
    if (Object.keys(certificateData).length === 0) {
      return (
        <>
          <h2>No NFTs found.</h2>
        </>
      );
    }

    return (
      <>
        {Object.keys(certificateData).map((category) => {
          return (
            <React.Fragment key={category}>
              <NFTCard category={category} nfts={certificateData[category]} />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="viewpage">
      <div className="viewcontainer">
        <div className="heading">My Digital Collection</div>
        <div className="status">{status}</div>
        <NFTData />
      </div>
    </div>
  );
};

export default View;
