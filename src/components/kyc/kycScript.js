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
  const [contact, setcontact] = useState(user.userData.contact);
  const [regId, setregId] = useState(user.userData.regId);
  const [idProof, setidProof] = useState("");

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
      regId === "" ||
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
      website: website,
      email: email,
      contact: contact,
      regId: regId,
      idProof: idProof,
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
  };
};

export default KycScript;
