import { useState, useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import { nftApi } from "../Scripts/apiCalls";
import { ethers } from "ethers";

const SouvenirScript = () => {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [addFrameopen, setAddFrameOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const saveImage = (file) => {
    setUploadedImage(file);
    let filereader = new FileReader();
    filereader.addEventListener("load", () => {
      setUploadedImageURL(filereader.result);
    });
    filereader.readAsDataURL(file);
  };

  const submitHandler = () => {
    setStatus("");
    if (!checkForEmptyData()) return;
    else if (!checkForFileSize()) return;
    else {
      uploadImage();
    }
  };

  const checkForEmptyData = () => {
    let isAddressValid = true;
    try {
      isAddressValid = ethers.utils.getAddress(recipient);
    } catch {
      isAddressValid = false;
    }
    if (assetName === "") {
      setStatus("Asset name is required.");
      return false;
    } else if (assetDescription === "") {
      setStatus("Asset description is required");
      return false;
    } else if (!isAddressValid) {
      setStatus("Invalid recipient address");
      return false;
    } else if (uploadedImage === null) {
      setStatus("Image is required.");
      return false;
    } else if (uploadedImage.size === undefined) {
      setStatus("Invalid Image");
      return false;
    } else {
      return true;
    }
  };

  const checkForFileSize = () => {
    let filesize = parseFloat(uploadedImage.size) / 1024;
    if (filesize <= 102400) {
      return true;
    } else {
      setStatus("File should be less than 100MB in size.");
      return false;
    }
  };

  const uploadImage = () => {
    let frameNameItems = selectedFrame.split("/");
    let frameName = frameNameItems[frameNameItems.length - 1];
    console.log(selectedFrame);
    console.log(frameName);
    setIsUploading(true);
    nftApi({
      account: user.userAccount,
      image: uploadedImage,
      asset_name: assetName,
      asset_description: assetDescription,
      recipient: recipient,
      frame: frameName,
    })
      .then(async (res) => {
        setStatus("Uploaded Successfully.");
        await user.poppulateUserData();
        setIsUploading(false);
      })
      .catch((err) => {
        setStatus("Something went wrong. Please try again.");
        setIsUploading(false);
      });
  };

  return {
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
  };
};

export default SouvenirScript;
