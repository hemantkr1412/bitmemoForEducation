import "../individual/Individual.css";
// import "./Souvenir.css";
import SouvenirScript from "./SouvenirScript";
import Connect from "../connection/Connect";
import DND from "../Scripts/draganddrop/DND";
import { useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import NoWalletPage from "../connection/NoWalletPage";
import KYC from "../kyc/kyc";
import AddFrame from "./addFrame";
import Preview from "./preview";

import React from "react";
export const Souvenir = () => {
  const user = useContext(UserContext);
  const {
    status,
    isUploading,
    uploadedImageURL,
    selectedFrame,
    setSelectedFrame,
    assetName,
    setAssetName,
    assetDescription,
    setAssetDescription,
    recipient,
    setRecipient,
    saveImage,
    submitHandler,
    addFrameopen,
    setAddFrameOpen,
    previewOpen,
    setPreviewOpen,
  } = SouvenirScript();

  if (!user.iswalletAvailable) {
    return <NoWalletPage />;
  }

  if (!user.isConnected) {
    return <Connect />;
  }

  if (user.userData.status !== "Approved") {
    return <KYC />;
  }

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Welcome {user.userData.name}</h1>
        <div>{user.userData.description}</div>
        {user.userData.total_souvenirs} Souvenirs issued so far.
        <h1>Give out Souvenirs</h1>
        <label htmlFor="individualfile">Upload Image*</label>
        <input
          type="file"
          id="fileselectorinput"
          style={{ display: "none" }}
          onChange={(e) => {
            saveImage(e.target.files[0]);
          }}
        />
        <DND uploadedImageURL={uploadedImageURL} saveImage={saveImage} />
        <label htmlFor="souvenirname">Souvenir Frame*</label>
        <select
          name="frameselector"
          id="frameselector"
          value={selectedFrame}
          onChange={(e) => {
            if (e.target.value === "addFrame") {
              setAddFrameOpen(true);
            } else {
              setSelectedFrame(e.target.value);
            }
          }}
        >
          <option value="">None</option>
          {Object.keys(user.userData.frames).map((frame) => (
            <option value={user.userData.frames[frame]} key={frame}>
              {frame}
            </option>
          ))}
          <option
            value="addFrame"
            style={{ background: "rgba(1, 1, 1, 0.2)" }}
            onClick={() => console.log("Add frame")}
          >
            Add Frame
          </option>
        </select>
        <label htmlFor="souvenirname">Souvenir Name*</label>
        <input
          type="text"
          id="souvenirname"
          placeholder="Enter Souvenir Name"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
        />
        <label htmlFor="recipientaddress">Recipient Wallet Address*</label>
        <input
          type="text"
          id="recipientaddress"
          placeholder="Enter Recipient Wallet Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <label htmlFor="description">Description*</label>
        <textarea
          name="description"
          id="description"
          value={assetDescription}
          onChange={(e) => setAssetDescription(e.target.value)}
        ></textarea>
        <div className="status">{status}</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {isUploading ? (
            <button>Uploading...</button>
          ) : (
            <button onClick={submitHandler}>Submit</button>
          )}
          <button onClick={() => setPreviewOpen(true)}>Preview</button>
        </div>
      </div>
      <AddFrame open={addFrameopen} setOpen={setAddFrameOpen} />
      <Preview
        open={previewOpen}
        setOpen={setPreviewOpen}
        souvenir={uploadedImageURL}
        frame={selectedFrame}
      />
    </div>
  );
};
export default Souvenir;
