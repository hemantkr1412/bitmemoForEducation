import KycScript from "./kycScript";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { Button } from "@mui/material";

export const KYCform = (props) => {
  const [approverDialog, setApproverDialog] = useState(false);

  const {
    status,
    isuploading,
    name,
    setName,
    description,
    setdescription,
    website,
    setwebsite,
    email,
    setemail,
    contact,
    setcontact,
    regId,
    setregId,
    idProof,
    setidProof,
    handleSubmit,
    approvers,
    setApprovers,
    issuerName,
    setIssuerName,
    country,
    setcountry,
    issuerJobDesignation,
    setIssuerJobDesignation,
    idProofApprovers,
    setIdProofApprovers,
    noteSignByHigherAuth,
    setNoteSignByHigherAuth,

  } = KycScript(props.setForm);

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Enter Your KYC Details</h1>
        <label htmlFor="name">Name of the Company*</label>
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the Organization"
        />
        <label htmlFor="name">Description</label>
        <input
          type="text"
          id="name"
          value={description}
          name="description"
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Description of the Organization"
        />
        <label htmlFor="email">Country*</label>
        <input 
          type="text"
          id="email"
          value={country}
          name="country"
          placeholder="Country"
          onChange={(e) => setcountry(e.target.value)}
        />
        <label htmlFor="email">Official Website*</label>
        <input
          type="email"
          id="email"
          value={website}
          name="website"
          placeholder="Official Website"
          onChange={(e) => setwebsite(e.target.value)}
        />
        <label htmlFor="Official website">Name*</label>
        <input
          type="text"
          id="phone_num"
          value={issuerName}
          name="name"
          placeholder="Name"
          onChange={(e) => setIssuerName(e.target.value)}
        />
        <label htmlFor="Official website">Designation*</label>
        <input
          type="text"
          id="phone_num"
          value={issuerJobDesignation}
          name="name"
          placeholder="Designation"
          onChange={(e) => setIssuerJobDesignation(e.target.value)}
        />
        <label htmlFor="Official website">Official email ID*</label>
        <input
          type="text"
          id="phone_num"
          value={email}
          name="email"
          placeholder="Official email ID"
          onChange={(e) => setemail(e.target.value)}
        />
        <label htmlFor="website">Phone number*</label>
        <input
          type="number"
          id="website"
          name="phone"
          value={contact}
          placeholder="Phone number"
          onChange={(e) => setcontact(e.target.value)}
        />
        {/* <label htmlFor="website">CIN*</label>
        <input
          type="text"
          id="website"
          name="CIN"
          value={regId}
          placeholder="CIN"
          onChange={(e) => setregId(e.target.value)}
        /> */}
        <label htmlFor="fileselectorinput">
          ID proof of the representative*
        </label>
        {idProof.name}
        <input
          type="file"
          id="fileselectorinput"
          onChange={(e) => {
            setidProof(e.target.files[0]);
          }}
        />

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
          Add approving authorities. (optional)
          <h5>
            Approving authorities have to approve any document issuance via
            email.
          </h5>
          {approvers?.map((person, index) => (
            <div
              key={"approver-" + person.email}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 3fr 1fr",
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
              <button
                onClick={() =>
                  setApprovers((prev) => {
                    let newArray = [];
                    prev.map((app, i) => {
                      if (i !== index) {
                        newArray.push(app);
                      }
                    });
                    return newArray;
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button onClick={() => setApproverDialog(true)}>Add approvers</button>
        </div>

        <div className="status">{status}</div>
        {isuploading ? (
          <button>Uploading...</button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              background: "var(--secondary)",
              color: "var(--primary)",
            }}
          >
            Submit KYC
          </button>
        )}
      </div>
      <Dialog onClose={() => setApproverDialog(false)} open={approverDialog}>
        <div
          style={{
            padding: "40px",
            background: "var(--primary)",
            color: "var(--secondary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <h2>Add Approver</h2>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="add-approver-name">Name: </label>
            <input type="text" id="add-approver-name" />
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="add-approver-designation">Designation: </label>
            <input type="text" id="add-approver-designation" />
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="add-approver-email">Email: </label>
            <input type="text" id="add-approver-email" />
            
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="fileselectorinput">
            ID proof of the representative*
            </label>
            {idProofApprovers.name}
            <input
            type="file"
            id="fileselectorinput"
            onChange={(e) => {
              setIdProofApprovers(e.target.files[0]);
             }}
            />
            
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <label htmlFor="fileselectorinput">
            Upload the Note(signed by highest authorities)*
            </label>
            {noteSignByHigherAuth.name}
            <input
            type="file"
            id="fileselectorinput"
            onChange={(e) => {
              setNoteSignByHigherAuth(e.target.files[0]);
             }}
            />
            
          </div>
          <button
            onClick={() => {
              setApprovers((prev) => [
                ...prev,
                {
                  name: document.getElementById("add-approver-name").value,
                  designation: document.getElementById(
                    "add-approver-designation"
                  ).value,
                  email: document.getElementById("add-approver-email").value,

                },
              ]);
              setApproverDialog(false);
            }}
          >
            Add
          </button>
        </div>
      </Dialog>
    </div>
  );
};
