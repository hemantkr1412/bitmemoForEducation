import { useState } from "react";

const CertIssue = ({ setView }) => {
  const [noOfAprovers, setNoOfApprovars] = useState(2);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Issue Certificates</h1>

      <div>
        <h3>Add Approvers</h3>
        <div
          style={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {Array(noOfAprovers)
            .fill(0)
            .map((x, index) => (
              <input type="text" placeholder="email id" />
            ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <button
              onClick={() => setNoOfApprovars((prevValue) => prevValue + 1)}
            >
              +
            </button>
            {noOfAprovers > 1 && (
              <button
                onClick={() => setNoOfApprovars((prevValue) => prevValue - 1)}
              >
                -
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ width: "500px" }}>
        <h3>Upload CSV file</h3>
        <input type="file" />
        <a href="#" style={{ color: "white" }}>
          Download CSV template
        </a>
      </div>

      <div
        style={{
          width: "500px",
          margin: "50px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button onClick={() => setView(1)}>{"< "} Back</button>
        <button>Next {" >"}</button>
      </div>
    </div>
  );
};

export default CertIssue;
