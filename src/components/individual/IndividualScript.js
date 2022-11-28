import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import { nftApi } from "../Scripts/apiCalls";

export const IndividualScript = () => {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");

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
    else if (!checkforstoragelimit()) return;
    else {
      uploadImage();
    }
  };

  const checkForEmptyData = () => {
    if (assetName === "") {
      setStatus("Asset name is required.");
      return false;
    } else if (assetDescription === "") {
      setStatus("Asset description is required");
      return false;
    } else if (uploadedImage === null) {
      setStatus("Image is required.");
      return false;
    } else if (uploadedImage.size === undefined) {
      setStatus("Invalid Image");
      return false;
    } else {
      console.log(uploadedImage.size);
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

  const checkforstoragelimit = () => {
    let filesize = parseFloat(uploadedImage.size) / 1024 / 1024;
    if (filesize + user.userData?.storage_used > user.userData?.storage_limit) {
      setStatus(
        "Storage quota exceeded. Please select a smaller file or contact support@beimagine.tech for more storage space."
      );
      return false;
    } else {
      return true;
    }
  };

  const uploadImage = () => {
    setIsUploading(true);
    nftApi({
      account: user.userAccount,
      image: uploadedImage,
      asset_name: assetName,
      asset_description: assetDescription,
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
    assetName,
    setAssetName,
    assetDescription,
    setAssetDescription,
    saveImage,
    submitHandler,
  };
};

export default IndividualScript;
