import Dialog from "@mui/material/Dialog";
import UserContext from "../../context/userContext/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { userApi } from "../Scripts/apiCalls";

function SimpleDialog(props) {
  const user = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("");
  const [frameName, setFrameName] = useState("");
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const uploadFrame = () => {
    setStatus("");
    userApi({
      account: user.userAccount,
      file: selectedFrame,
      frames: true,
      frame_name: frameName,
    })
      .then(async (res) => {
        await user.poppulateUserData();
        onClose();
      })
      .catch((err) => {
        setStatus("Something went wrong. Please try again.");
      });
  };

  const saveFrame = () => {
    if (selectedFrame === "") setStatus("Please select a frame image.");
    else if (frameName === "") setStatus("Please give it a name");
    else uploadFrame();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
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
            placeholder="Enter name"
            value={frameName}
            onChange={(e) => setFrameName(e.target.value)}
          />
          <div className="status">{status}</div>
          <button onClick={saveFrame}>Save Frame</button>
        </div>
      </div>
    </Dialog>
  );
}

export default function AddFrame(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
