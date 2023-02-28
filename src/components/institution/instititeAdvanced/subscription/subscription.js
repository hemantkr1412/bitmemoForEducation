import { ethers } from "ethers";
import abi from "../../../Scripts/tokenContract.json";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useContext } from "react";
import { paymentApi } from "../../../Scripts/apiCalls";
import UserContext from "../../../../context/userContext/UserContext";

const Subscription = ({ setView, back }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  const handleUSDT = async (amount) => {
    amount = amount.toString() + "000000000000000000";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(
      "0x75e8Dd78D660C611157a79bF518F04f37Cc7493C",
      abi,
      signer
    );

    tokenContract
      .transfer("0xE858f0370b101cD3F58E03F18BFA1240a591b5Fa", amount)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        paymentApi({ tx_hash: res.hash }).then((res) =>
          user.poppulateUserData()
        );
      })
      .catch((err) => {
        console.log(err);
        alert("Transaction unsuccessful");
      });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Select a Subscription Plan</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h1>Silver Plan</h1>
          <h3>1000 certificates</h3>
          <h3>1000 $</h3>
          <button onClick={() => handleUSDT(1000)}>Buy with USDT</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h1>Gold Plan</h1>
          <h3>5000 certificates</h3>
          <h3>5000 $</h3>
          <button onClick={() => setView(1)}>Select</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h1>Platinum Plan</h1>
          <h3>Unlimited certificates</h3>
          <h3>10000 $</h3>
          <button onClick={() => setView(1)}>Select</button>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <button onClick={back}>{"<"} Back</button>
      </div>
    </div>
  );
};

export default Subscription;

const LoadingPage = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
