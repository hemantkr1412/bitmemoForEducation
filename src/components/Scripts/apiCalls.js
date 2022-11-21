import { addFrame } from "./metadata";

const api = "http://127.0.0.1:8000/";

export const addAdmin = async (name, designation, account, addedBy) => {
  const endpoint = "addAdmin";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("account", account);
  formData.append("designation", designation);
  formData.append("addedBy", addedBy);

  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });

  return response;
};
export const checkAdmin = async (account) => {
  const endpoint = "checkAdmin";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("account", account);
  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
  return response;
};
export const addIssuer = async (name, description, account, addedBy) => {
  const endpoint = "addIssuer";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("account", account);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("addedBy", addedBy);
  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
  return response;
};
export const addDestination = async (
  name,
  description,
  account,
  frame,
  addedBy
) => {
  const endpoint = "addDestination";
  const url = api + endpoint;
  const frameURL = await addFrame(frame);
  let formData = new FormData();
  formData.append("account", account);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("frame", frameURL);
  formData.append("addedBy", addedBy);
  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
  return response;
};
export const checkDestination = async (account) => {
  const endpoint = "checkDestination";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("account", account);
  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
  return response;
};
export const addSouvenir = async (
  account,
  name,
  description,
  metadata,
  image,
  addedBy
) => {
  const endpoint = "addSouvenir";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("account", account);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("metadata", metadata);
  formData.append("image", image);
  formData.append("addedBy", addedBy);

  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
  return response;
};
export const addCertificate = async (
  account,
  name,
  description,
  metadata,
  image,
  addedBy
) => {
  const endpoint = "createCertificate";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("account", account);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("metadata", metadata);
  formData.append("image", image);
  formData.append("addedBy", addedBy);

  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
  return response;
};

export const getCertificates = async (account) => {
  let formData = new FormData();
  formData.append("account", account);
  const endPoint = "getcertificates";
  const url = api + endPoint;
  return await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
};
export const getIssuerDetails = async (address) => {
  let formData = new FormData();
  formData.append("address", address);
  const endPoint = "getIssuerDetails";
  const url = api + endPoint;
  return await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
};
export const getNumberOfCertificates = async () => {
  const endPoint = "getNumberOfCertificates";
  const url = api + endPoint;
  return await fetch(url, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return "Server error";
    });
};
export const createSouvenir = async (file, frameURL) => {
  let formData = new FormData();
  formData.append("image", file);
  formData.append("frame_url", frameURL);
  const endPoint = "createSouvenir";
  const url = api + endPoint;
  return await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return "Server error";
    });
};
export const generateEOCertificate = async (name) => {
  let formData = new FormData();
  formData.append("name", name);

  const endPoint = "generateEOCertificate";
  const url = api + endPoint;
  return await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return "Server error";
    });
};
export const getIndividual = async (account) => {
  let formData = new FormData();
  formData.append("account", account);
  const endPoint = "getIndividual";
  const url = api + endPoint;
  return await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
};

export const individualFileUpload = async (
  name,
  description,
  metadataURL,
  imageURL,
  filesize,
  account
) => {
  const endPoint = "individualfileupload";
  const url = api + endPoint;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("account", account);
  formData.append("description", description);
  formData.append("metadata", metadataURL);
  formData.append("image", imageURL);
  formData.append("filesize", filesize);

  return await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
};

//KYC Application
export const kycApply = async (name,walletKey, website,email,contact,regId,idProof) => {
  const endpoint = "applyKYC";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("walletKey", walletKey);
  formData.append("website", website);
  formData.append("email", email);
  formData.append("contact", contact);
  formData.append("regId", regId);
  formData.append("idProof", idProof);
  
  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });
  return response;
};

export const setKYCStatus = async (status,regId,comment) => {
  const endpoint = "kycStatus";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("status", status);
  formData.append("regId", regId);
  formData.append("comment", comment);

  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return "Server error";
    });

  return response;
}

export const adminViewKYCstatus = async (status) => {
  const endpoint = "adminViewKycStatus";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("status", status);

  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {

      return (err);
    });

  return response;
  
   
}


export const getMyKYCStatus = async (walletKey) => {
  const endpoint = "getMyKycStatus";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("walletKey", walletKey);
  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {

      return (err);
    });

  return response;
  

}

export const updateKYC = async ( name, website, email, contact, regId, idProof) => {
  const endpoint = "updatekyc";
  const url = api + endpoint;
  let formData = new FormData();
  formData.append("name", name);
  formData.append("website", website);
  formData.append("email", email);
  formData.append("contact", contact);
  formData.append("regId", regId);
  formData.append("idProof", idProof);
  const response = await fetch(url, { method: "POST", body: formData })
    .then((res) => {
      return res.json();
    }
    )
    .catch((err) => {
        
        return (err);
      });
  return response
  }