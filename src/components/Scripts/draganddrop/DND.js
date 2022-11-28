import React from "react";
import DragAndDrop from "./Draganddrop";
import "../../individual/Individual.css";

const DND = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });

  return (
    <div
      className="fileselector"
      style={{
        backgroundImage: "url('" + props.uploadedImageURL + "')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onClick={() => {
        document.getElementById("fileselectorinput").click();
      }}
    >
      <DragAndDrop data={data} dispatch={dispatch} />
      {/* <img src={fileselector} alt="Upload File" /> */}
      Drag &amp; Drop File here
      <div>or</div>
      <button>Browse Files</button>
    </div>
  );
};

export default DND;
