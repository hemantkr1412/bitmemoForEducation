import "./Connection.css";
import wallet from "./assets/wallet.svg";

import React from "react";
import UserContext from "../../context/userContext/UserContext";
import { useContext, useEffect } from "react";

const Connect = () => {
  const user = useContext(UserContext);

  return (
    <div className="nowalletpage">
      <img src={wallet} alt="Wallet" />
      <h2>Please connect your wallet</h2>
      This won't cost you any gas.
      <button
        onClick={() => {
          user.login();
        }}
      >
        Connect
      </button>
    </div>
  );
};

export default Connect;
