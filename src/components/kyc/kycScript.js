import { useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import { useContext } from "react";
import { userApi } from "../Scripts/apiCalls";

const KycScript = (setForm) => {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [isuploading, setisuploading] = useState(false);
  const [name, setName] = useState(user.userData.name);
  const [description, setdescription] = useState(user.userData.description);
  const [website, setwebsite] = useState(user.userData.website);
  const [email, setemail] = useState(user.userData.email);
  const [contact, setcontact] = useState(parseInt(user.userData.contact));
  const [regId, setregId] = useState(user.userData.regId);
  const [idProof, setidProof] = useState("");
  const [approvers, setApprovers] = useState(user.userData.approvers);
  const [issuerName, setIssuerName] = useState("");
  const [country, setcountry] = useState("");
  const [issuerJobDesignation, setIssuerJobDesignation] = useState("");
  const [idProofApprovers, setIdProofApprovers] = useState("");
  const [noteSignByHigherAuth, setNoteSignByHigherAuth] = useState("");

  const handleSubmit = () => {
    setStatus("");
    if (!checkForEmptyData()) return;
    else {
      uploadData();
    }
  };

  const checkForEmptyData = () => {
    if (
      name === "" ||
      website === "" ||
      email === "" ||
      contact === "" ||
      idProof === ""
    ) {

    
      setStatus("* marked fields are required.");
      return false;
    } else {
      return true;
    }
  };

  const uploadData = () => {
    setisuploading(true);
    userApi({
      account: user.userAccount,
      name: name,
      description: description,
      // country: country,
      // issuerName: issuerName,
      // issuerDesignation: issuerJobDesignation,
      website: website,
      email: email,
      contact: contact,
      regId: regId,
      idProof: idProof,
      approvers: JSON.stringify(approvers),
    })
      .then(async (res) => {
        setisuploading(false);
        setStatus("Submitted Successfully.");
        await user.poppulateUserData();
        setForm(false);
      })
      .catch((err) => {
        setisuploading(false);
        setStatus("Something went wrong. Please try again.");
      });
  };

  return {
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
    
  };
};

export default KycScript;
