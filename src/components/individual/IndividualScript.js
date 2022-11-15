import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import { create_metadata } from "../Scripts/metadata";
import { individualFileUpload, getIndividual } from "../Scripts/apiCalls";
import { checkDestination } from "../Scripts/apiCalls";

export const IndividualScript = () => {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(5120);

  useEffect(() => {
    poppulateIndividualData();
  }, [user]);

  const poppulateIndividualData = async () => {
    getIndividual(user.userAccount)
      .then((res) => {
        if (res !== "Server error") {
          if (res.status === "Success") {
            setStorageLimit(res.credentials.storage_limit);
            setStorageUsed(res.credentials.storage_used);
          }
        }
      })
      .catch((err) => {
        setStatus("Unable to fetch data.");
      });
  };

  const saveImage = (file) => {
    setUploadedImage(file);
    let filereader = new FileReader();
    filereader.addEventListener("load", () => {
      setUploadedImageURL(filereader.result);
    });
    filereader.readAsDataURL(file);
  };

  const submitHandler = (name, description) => {
    checkforemptydata(name, description);
  };

  const checkforemptydata = (name, description) => {
    if (name === "") {
      setStatus("Asset name is required.");
    } else if (description === "") {
      setStatus("Asset description is required");
    } else if (uploadImage === "") {
      setStatus("Image is required.");
    } else {
      setStatus("Uploading...");
      checkforstoragelimit(name, description);
    }
  };

  const checkforstoragelimit = (name, description) => {
    let filesize = parseFloat(uploadedImage.size) / 1024;

    if (filesize + storageUsed > storageLimit) {
      setStatus(
        "Storage quota exceeded. Please contact support@beimagine.tech for more storage space."
      );
      return;
    } else {
      setIsUploading(true);
      create_metadata(uploadedImage, name, description)
        .then((res) => {
          if (res.status === "Success") {
            uploadImage(
              name,
              description,
              res.metadataURL,
              res.imageURL,
              filesize,
              user.userAccount
            );
          } else {
            setStatus("Something went wrong. PLease try again.");
            setIsUploading(false);
          }
        })
        .catch((err) => {
          setStatus("Something went wrong. PLease try again.");
          setIsUploading(false);
        });
    }
  };

  const uploadImage = async (
    name,
    description,
    metadataURL,
    imageURL,
    filesize,
    account
  ) => {
    individualFileUpload(
      name,
      description,
      metadataURL,
      imageURL,
      filesize,
      account
    ).then((res) => {
      if (res !== "Server error") {
        if (res.status === "Success") {
          setIsUploading(false);
          setStatus("NFT created successfully.");
          let explorerURL =
            "https://mumbai.polygonscan.com/tx/" + res["tx_hash"];
          window.open(explorerURL);
        } else {
          setStatus("Something went wrong. PLease try again.");
          setIsUploading(false);
        }
      } else {
        setStatus("Something went wrong. PLease try again.");
        setIsUploading(false);
      }
    });
  };

  return {
    status,
    isUploading,
    uploadedImageURL,
    storageLimit,
    storageUsed,
    saveImage,
    submitHandler,
  };
};

export default IndividualScript;
