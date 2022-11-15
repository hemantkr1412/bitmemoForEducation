import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import { getCertificates, getIssuerDetails } from "../Scripts/apiCalls";

const ViewScript = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [certificateData, setCertificateData] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user.iswalletAvailable) {
      navigate("/wallet");
      return;
    }
    poppulateCertificates();
  }, [user]);

  const poppulateCertificates = async () => {
    if (user.userAccount != "") {
      setStatus("Loading my certificates...");
      await getCertificates(user.userAccount)
        .then((res) => {
          if (res.status === "Success") {
            setCertificateData(res.categories);
            setStatus("");
          } else {
            setStatus(
              "Something went wrong loading your files. Please refresh or try again in some time."
            );
          }
        })
        .catch((err) => {
          setStatus(
            "Something went wrong loading your files. Please refresh or try again in some time."
          );
        });
    }
  };

  return { status, certificateData, user, navigate };
};

export default ViewScript;
