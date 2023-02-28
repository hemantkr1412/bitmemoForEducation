import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { approvalApi } from "../../../Scripts/apiCalls";

const Approval = () => {
  const { orderId, otp } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Approving...");
  const [approvers, setApprovers] = useState([]);

  useEffect(() => {
    approvalApi({ order_id: orderId, otp: otp })
      .then((res) => {
        console.log(res);
        if (res === "Fulfilled") {
          setStatus("Approved. Certificates issued successfully.");
          setIsLoading(false);
        } else {
          setStatus("Approved.");
          setIsLoading(false);
          setApprovers(res);
        }
      })
      .catch((err) => {
        setStatus("Something went wrong. Please try again.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "var(--primary)",
        padding: "20px",
        color: "var(--secondary)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {status}
        <br />
        <br />

        {status === "Approved." && (
          <div
            style={{
              marginTop: "20px",
              border: "1px solid white",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Certificate is pending approval from the following approvers:
            {approvers?.map((person, index) => (
              <div
                key={"approver-" + person.email}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                  margin: "10px 0px",
                  padding: "10px 0px",
                }}
              >
                {index + 1}.
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr",
                    }}
                  >
                    Name:
                    <span>{person.designation}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr",
                    }}
                  >
                    Designation:
                    <span>{person.designation}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr",
                    }}
                  >
                    Email:
                    <span>{person.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isLoading && <LoadingPage />}
    </div>
  );
};

export default Approval;

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
