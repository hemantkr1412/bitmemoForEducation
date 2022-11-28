import "../individual/Individual.css";
import { useState } from "react";
import { KYCform } from "./KYCform";
import { useContext } from "react";
import UserContext from "../../context/userContext/UserContext";

const KYC = () => {
  const user = useContext(UserContext);
  const [isform, setForm] = useState(false);
  return (
    <div className="individualpage">
      {isform ? (
        <KYCform setForm={setForm} />
      ) : (
        <>
          {user.userData.status === "unverified" && (
            <>
              <h2>You have not completed your KYC</h2>
              <button onClick={() => setForm(true)}>Start KYC</button>
            </>
          )}
          {user.userData.status === "in_progress" && (
            <>
              <h2>Your KYC approval is pending</h2>
              <h3>For more support:</h3>
              <h3>email us at hello@beimagine.tech</h3>
            </>
          )}
          {user.userData.status === "Approved" && (
            <>
              <h2>KYC Approved</h2>
            </>
          )}
          {user.userData.status === "Rejected" && (
            <>
              <h2>Your KYC was Rejected.</h2>
              <h3>Reason: {user.userData.comment}</h3>
              <h3>For more support:</h3>
              <h3>email us at hello@beimagine.tech</h3>
              <button onClick={() => setForm(true)}>Restart KYC</button>
            </>
          )}
          {user.userData.status === "Revoked" && (
            <>
              <h2>Your KYC approval has been revoked.</h2>
              <h3>Reason: {user.userData.comment}</h3>
              <h3>For more support:</h3>
              <h3>email us at hello@beimagine.tech</h3>
              <button onClick={() => setForm(true)}>Restart KYC</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default KYC;
