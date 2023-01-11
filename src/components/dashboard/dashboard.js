import "./dashboard.css";
import { useContext, useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DeleteIcon from "@mui/icons-material/Delete";
import { fileDownload } from "../Scripts/tools";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { userApi, nftApi } from "../Scripts/apiCalls";
import Dialog from "@mui/material/Dialog";
import Certificate from "../institution/certificate";

const Dashboard = () => {
  return (
    <div className="dashboardpage">
      <div className="dashboardcontainer">
        <PrimaryDetails />
        <KPI />
        <Templates />
        <Frames />
      </div>
    </div>
  );
};

export default Dashboard;

const PrimaryDetails = () => {
  const user = useContext(UserContext);
  const userData = user.userData;

  const details1 = {
    Name: userData.name,
    Description: userData.description,
    Email: userData.email,
    Website: userData.website,
    Account: userData.account,
  };
  const details2 = {
    Status:
      userData.status === "Approved"
        ? "Verified"
        : userData.status === "in_progress"
        ? "Verification Pending"
        : "Unverified",
    "Reg. Id": userData.regId,
    "Id Proof": (
      <IconButton onClick={() => fileDownload(userData.idProof, "idProof")}>
        <DownloadForOfflineIcon color="primary" />
      </IconButton>
    ),
    "Personal storage":
      userData["storage_used"] + " / " + userData["storage_limit"] + " MB",
    "Contract Address": userData["contract_address"],
  };

  return (
    <>
      <div className="sectionheading">
        <h2>Primary Details</h2>
      </div>
      <div className="primarydatacontainer">
        <div className="userdetail">
          {Object.keys(details1).map((item) => (
            <div className="userdetails" key={item + "inuserData1"}>
              <h4>{item}:</h4>
              <h4>{details1[item]}</h4>
            </div>
          ))}
        </div>
        <div className="userdetail">
          {Object.keys(details2).map((item) => (
            <div className="userdetails" key={item + "inuserData2"}>
              <h4>{item}:</h4>
              <h4>{details2[item]}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const KPI = () => {
  const user = useContext(UserContext);
  const userData = user.userData;

  return (
    <div className="certificatesectioncontainer">
      <div className="certificatesissued">
        <div className="heading3">{userData["total_certificates"]}</div>
        <div className="heading2">Total certificates issued</div>
      </div>

      <div className="certificatesissued">
        <div className="heading3">{userData["total_souvenirs"]}</div>
        <div className="heading2">Total souvenirs issued</div>
      </div>
    </div>
  );
};

const Frames = () => {
  const user = useContext(UserContext);
  const userData = user.userData;
  const frameNames = Object.keys(userData?.["frames"]);
  const [selectedFrame, setSelectedFrame] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");

  const deleteFrame = async (frameName) => {
    userApi({
      account: user.userAccount,
      frame_name: frameName,
      frames: true,
    })
      .then(async (res) => {
        await user.poppulateUserData();
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  const addFrame = () => {
    userApi({
      account: user.userAccount,
      file: selectedFrame,
      frames: true,
      frame_name: document.getElementById("frame-name-select").value,
    })
      .then(async (res) => {
        await user.poppulateUserData();
        setDialogOpen(false);
      })
      .catch((err) => {
        setStatus("Something went wrong. Please try again.");
      });
  };

  const AddFrameDialog = () => {
    return (
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <div className="individualpage">
          <div className="individualformcontainer">
            <h1>Add new frame</h1>
            <label htmlFor="frame-select">Select frame</label>
            {selectedFrame.name}
            <input
              type="file"
              id="frame-select"
              onChange={(e) => setSelectedFrame(e.target.files[0])}
            />
            <label htmlFor="frame-name-select">Frame Name</label>

            <input
              type="text"
              id="frame-name-select"
              placeholder="Enter name for the frame"
            />
            <div className="status">{status}</div>
            <button onClick={addFrame}>Save Frame</button>
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <>
      <div className="sectionheading">
        <h2>Souvenir Frames</h2>
      </div>
      <div className="certContainer">
        {frameNames.length > 0 && (
          <>
            {frameNames.map((frame, index) => (
              <div className="framecard" key={index + frame}>
                <div className="framepreview">
                  <img src={userData["frames"][frame]} alt={frame} />
                </div>
                <div className="framebuttons">
                  <DownloadForOfflineIcon
                    color="white"
                    onClick={() =>
                      fileDownload(userData["frames"][frame], frame)
                    }
                  />
                  <DeleteIcon
                    color="white"
                    onClick={() => deleteFrame(frame)}
                  />
                </div>
                <h4>{frame}</h4>
              </div>
            ))}
          </>
        )}

        <div className="framecard">
          <div
            className="framepreview"
            onClick={() => {
              console.log("clicked");
              setDialogOpen(true);
            }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: 200 }} />
          </div>
          <div className="framebuttons"></div>
          <h4>Add Frame</h4>
        </div>
      </div>
      <AddFrameDialog />
    </>
  );
};
const Templates = () => {
  const user = useContext(UserContext);
  const userData = user.userData;
  const templateNames = Object.keys(userData?.["certificates"]);

  const deleteTemplate = async (template) => {
    userApi({
      account: user.userAccount,
      delete_certificate: true,
      template: template,
      certificates: "",
    })
      .then(async (res) => {
        console.log(res);
        await user.poppulateUserData();
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  const downloadTemplate = async (template) => {
    nftApi({
      account: user.userAccount,
      recipient: "walletAddress",
      cert: "download",
      template: template,
      variable1: userData["certificates"][template]["variable1"],
      variable2: userData["certificates"][template]["variable2"],
    })
      .then(async (res) => {
        fileDownload(res, "sample");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="sectionheading">
        <h2>Certificate Templates</h2>
      </div>
      <div className="certContainer">
        {templateNames.length > 0 && (
          <>
            {templateNames.map((template, index) => (
              <div className="framecard" key={index + template}>
                <div className="framepreview">
                  <Certificate
                    certData={userData["certificates"][template]}
                    width={250}
                  />
                </div>
                <div className="framebuttons">
                  <DownloadForOfflineIcon
                    color="white"
                    onClick={() => downloadTemplate(template)}
                  />
                  <DeleteIcon
                    color="white"
                    onClick={() => deleteTemplate(template)}
                  />
                </div>
                <h4>{template}</h4>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
