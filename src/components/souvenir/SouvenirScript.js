import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
import {
  createSouvenir,
  addSouvenir,
  checkDestination,
} from "../Scripts/apiCalls";
import { create_metadata } from "../Scripts/metadata";

export const SouvenirScript = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [isDestination, setIsDestination] = useState(false);
  const [destinationName, setDestinationname] = useState("");
  const [destinationDescription, setDestinationDescription] = useState("");
  const [destinationFrame, setDestinationFrame] = useState("");
  const [destinationSouvenirNumber, setDestinationSouvenirNumber] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [status, setStatus] = useState("");
  const user = useContext(UserContext);

  //KYC Information
  const [input, setInput] = useState({
    name: "",
    website:"",
    email:"",
    phone:"",
    CIN:"",
    IdProof:""
  });



  

  useEffect(() => {
    if (!user.iswalletAvailable) {
      navigate("/wallet");
      return;
    }
    checkDestination(user.userAccount)
      .then((res) => {
        if (res != "Server error") {
          if (res.status === "Success") {
            setIsDestination(true);
            setDestinationname(res.credentials.name);
            setDestinationDescription(res.credentials.description);
            setDestinationFrame(res.credentials.frame);
            setDestinationSouvenirNumber(res.credentials.total_certificates);
          }
        }
      })
      .catch((err) => {
        setStatus("Unable to fetch data.");
      });
  }, [user]);

  const saveImage = (file) => {
    console.log("saving image...");
    setUploadedImage(file);
    let filereader = new FileReader();
    filereader.addEventListener("load", () => {
      setUploadedImageURL(filereader.result);
    }); 
    filereader.readAsDataURL(file);
  };


  //KYC Submit Handler
  async function submit() {
    let fieldcheck = checkEmptyFields();
    if (fieldcheck) {
      // let souvenirfileraw = await addFrame();
      console.log(input,uploadedImage);
      return { status:"Success"};

      // if (souvenirfileraw !== "Server error") {
      //   let souvenirfile = await createfilefromraw(souvenirfileraw);

      //   await uploadsouvenir(souvenirfile);
      // } else {
      //   setStatus("Something went wrong. Please try again");
      // }
    }
  }


  //KYC Check Empty Fields
  const checkEmptyFields = () => {
    setStatus("Submitting...");
    if (
      input.name === "" ||
      input.website === "" ||
      input.email === "" ||
      input.phone === "" ||
      input.CIN === "" ||
      input.IdProof === ""||
      uploadedImage === ""

    ) {
      setStatus("*All fields are required.");
      return false;
    } else {
      return true;
    }
  };


  //alert("KYC Submitted Successfully");
  var close = document.getElementsByClassName("closebtn");
  var i;

  for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 200);
  }
  }




  const uploadsouvenir = async (souvenirfile) => {
    setStatus("Issuing souvenir...");
    let souvenirName = document.getElementById("souvenirname").value;
    let recipientAddress = document.getElementById("recipientaddress").value;
    let description = document.getElementById("description").value;

    await uploadSouvenir(
      recipientAddress,
      souvenirName,
      description,
      souvenirfile,
      user.userAccount
    )
      .then((res) => {
        if (res.status === "Success") {
          setStatus("Souvenir issued successfully.");
        } else {
          setStatus("Something went wrong. Please try again");
        }
      })
      .catch((err) => {
        setStatus("Something went wrong. Please try again");
      });
  };

  const addFrame = async () => {
    setStatus("Adding frame...");
    return await createSouvenir(uploadedImage, destinationFrame)
      .then((res) => {
        if (res !== "Server error") {
          return res;
        } else {
          return "Server error";
        }
      })
      .catch((err) => {
        setStatus("Something went wrong. Please try again");
        return "Server error";
      });
  };

  const createfilefromraw = async (rawfile) => {
    return await rawfile.blob().then((blobResponse) => {
      let filename = document.getElementById("souvenirname").value + ".png";

      const myFile = new File([blobResponse], filename, {
        type: blobResponse.type,
      });
      return myFile;
    });
  };

  const uploadSouvenir = async (account, name, description, file, addedBy) => {
    console.log("Uploading souvenir...");
    let ipfsResponse = await create_metadata(file, name, description);
    if (ipfsResponse.status === "Success") {
      let image = ipfsResponse.imageURL;
      let metadata = ipfsResponse.metadataURL;
      return await addSouvenir(
        account,
        name,
        description,
        metadata,
        image,
        addedBy
      );
    } else {
      return { status: "Failed" };
    }
  };

  return {
    user,
    uploadedImageURL,
    isDestination,
    destinationName,
    destinationDescription,
    destinationSouvenirNumber,
    isloading,
    status,
    saveImage,
    submit,
    input,
    setInput,
  };
};

export default SouvenirScript;
