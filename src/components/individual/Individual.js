import "./Individual.css";
import { useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import Connect from "../connection/Connect";
import IndividualScript from "./IndividualScript";
import DND from "../Scripts/draganddrop/DND";
import NoWalletPage from "../connection/NoWalletPage";

export const Individual = () => {
  const user = useContext(UserContext);
  const {
    status,
    isUploading,
    uploadedImageURL,
    assetName,
    setAssetName,
    assetDescription,
    setAssetDescription,
    saveImage,
    submitHandler,
  } = IndividualScript();

  if (!user.iswalletAvailable) {
    return <NoWalletPage />;
  }

  if (!user.isConnected) {
    return <Connect />;
  }

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Create Your Digital Certificate</h1>
        {Math.round((user.userData?.storage_used / 1024) * 100) / 100} GB used
        out of {Math.round((user.userData?.storage_limit / 1024) * 100) / 100}{" "}
        GB
        <label htmlFor="fileselectorinput">Upload Image*</label>
        <input
          type="file"
          id="fileselectorinput"
          style={{ display: "none" }}
          onChange={(e) => {
            saveImage(e.target.files[0]);
          }}
        />
        <DND uploadedImageURL={uploadedImageURL} saveImage={saveImage} />
        <label htmlFor="assetname">Asset Name*</label>
        <input
          type="text"
          id="assetname"
          placeholder="Enter Asset Name"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
        />
        <label htmlFor="description">Description*</label>
        <textarea
          name="description"
          id="description"
          value={assetDescription}
          onChange={(e) => setAssetDescription(e.target.value)}
        ></textarea>
        <div className="status">{status}</div>
        <div className="whitebutton">
          {isUploading ? (
            <button>Uploading...</button>
          ) : (
            <button onClick={submitHandler}>Submit</button>
          )}
        </div>
        <div className="instructiontext">
          Note: As per instructions issued by Government of India from time to
          time, it is advised not to upload your government issued
          identification such as Aadhaar card, PAN card, etc. on BitMemoir.
          Beyond Imagination Technologies Private Limited and its associated
          personnnel will not be liable or responsible for misuse of such
          critical personal information at any point in time.
        </div>
      </div>
    </div>
  );
};
export default Individual;
