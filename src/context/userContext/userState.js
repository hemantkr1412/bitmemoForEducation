import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { userApi } from "../../components/Scripts/apiCalls";

import { ethers } from "ethers";

const UserState = (props) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
  const [isConnected, setIsConnected] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [iswalletAvailable, setIsWalletAvailable] = useState(true);
  const [userData, setUserData] = useState({});

  const poppulateUserAccount = () => {
    setIsWalletAvailable(window.ethereum != null);
    if (
      window.ethereum !== null &&
      window.ethereum.selectedAddress !== null &&
      window.ethereum.selectedAddress !== ""
    ) {
      setIsConnected(true);
      setUserAccount(window.ethereum.selectedAddress);
      poppulateUserData(window.ethereum.selectedAddress);
    } else {
      setIsConnected(false);
      setUserAccount("");
    }
  };

  const poppulateUserData = async () => {
    await userApi({ account: window.ethereum.selectedAddress })
      .then((res) => {
        console.log(res);
        setUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      poppulateUserAccount();
    }, 1000);
  }, []);

  const login = async () => {
    await provider
      .send("eth_requestAccounts", [])
      .then((res) => {
        setIsConnected(true);
      })
      .catch((err) => {});
    poppulateUserAccount();
  };

  return (
    <UserContext.Provider
      value={{
        provider,
        login,
        iswalletAvailable,
        isConnected,
        userAccount,
        userData,
        poppulateUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
