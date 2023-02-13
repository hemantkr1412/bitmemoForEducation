import uploadIcon from "../../assets/uploadIcon.jpg";
import { useState } from "react";
import Draggable from "react-draggable";
import PanToolIcon from "@mui/icons-material/PanTool";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { SketchPicker } from "react-color";

const CertCreator = ({ setView }) => {
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedVariables, setSelectedVariables] = useState([]);

  const variableOptions = [
    "Student Name",
    "Mother Name",
    "Enrollment No",
    "Obtained Marks",
    "Obtained Grades",
    "Total Marks",
    "CGPA",
    "Percentage",
    "Evaluated By",
    "Approved By",
    "Program Name",
    "Program Duration",
    "Course Name",
    "Batch Name",
    "Batch Code",
    "Batch Start Date",
    "Batch End Date",
    "Batch Duration",
    "Module",
    "Hall Admit Number",
    "Division",
    "Department Name",
    "School Name",
    "Organizational Name",
    "Issued Date",
    "Signatory Name",
    "Signatory Designation",
  ];

  const selectImage = (file) => {
    setUploadedImage(file);
    let filereader = new FileReader();
    filereader.addEventListener("load", () => {
      setSelectedImage(filereader.result);
    });
    filereader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 20px",
      }}
    >
      <h2>Template Creator</h2>
      <input
        type="file"
        id="image-selector"
        style={{ display: "none" }}
        onChange={(e) => selectImage(e.target.files[0])}
      />
      <div style={{ width: "100%", maxWidth: "720px", position: "relative" }}>
        <img
          src={selectedImage}
          alt="Custom Template"
          width="100%"
          style={{ top: "0px", left: "0px", borderRadius: "20px" }}
          id="cert-creator-preview"
          onClick={() => document.getElementById("image-selector").click()}
        />
        {selectedVariables.length > 0 &&
          selectedVariables.map((variable) => (
            <DragVariable
              variable={variable}
              selectedVariables={selectedVariables}
              setSelectedVariables={setSelectedVariables}
              key={"variable-added-by-dragging-" + variable.variable}
            />
          ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <select id="draggable-variable-selector">
          Select Variables
          {variableOptions.map((option) => (
            <option>{option}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSelectedVariables([
              ...selectedVariables,
              {
                variable: document.getElementById("draggable-variable-selector")
                  .value,
                x_pos: "10",
                y_pos: "20",
                width: "30",
                height: "5",
                color: "#000000",
              },
            ]);
          }}
        >
          Add Variable +
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setView(2)}>Next {">"}</button>
      </div>
    </div>
  );
};

export default CertCreator;

const DragVariable = ({
  variable,
  selectedVariables,
  setSelectedVariables,
}) => {
  const [isColorPicker, setIsColorPicker] = useState(false);

  const getTextHeight = (variableHeight) => {
    let fullheight = 200;
    try {
      fullheight = document.getElementById("cert-creator-preview").offsetHeight;
    } catch {
      fullheight = 200;
    }
    let textHeight = parseInt((fullheight * variableHeight) / 100) + "px";
    return textHeight;
  };

  const changeVariableAttribute = (attributename, valueChange) => {
    let newVariables = [];
    selectedVariables.map((myvariable) => {
      if (myvariable.variable === variable.variable) {
        if (attributename === "color") {
          myvariable[attributename] = valueChange;
        } else {
          myvariable[attributename] =
            parseInt(myvariable[attributename]) + valueChange;
        }
      }
      newVariables.push(myvariable);
    });
    setSelectedVariables(newVariables);
  };
  return (
    <Draggable handle="#handle">
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: variable.width + "%",
          height: variable.height + "%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "transparent",
            color: "transparent",
            padding: "20px",
            position: "relative",

            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid black",
              borderRadius: "10px",
              color: "black",
            },
          }}
        >
          <div
            style={{
              color: variable.color,
              width: "100%",
              textAlign: "center",
              fontSize: getTextHeight(variable.height),
            }}
          >
            {variable.variable}
          </div>
          <div id="handle">
            <PanToolIcon
              sx={{ position: "absolute", bottom: "-5px", right: "-5px" }}
            />
          </div>
          <div style={{ position: "absolute", top: "-20px", left: "0px" }}>
            <TextIncreaseIcon
              fontSize="small"
              onClick={() => changeVariableAttribute("height", 1)}
            />
            <TextDecreaseIcon
              fontSize="small"
              onClick={() => changeVariableAttribute("height", -1)}
            />
            <FormatColorFillIcon
              fontSize="small"
              onClick={() => setIsColorPicker(!isColorPicker)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "-20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AddCircleOutlineIcon
              fontSize="small"
              onClick={() => changeVariableAttribute("width", 1)}
            />
            <RemoveCircleOutlineIcon
              fontSize="small"
              onClick={() => changeVariableAttribute("width", -1)}
            />
          </div>

          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <HighlightOffIcon
              onClick={() => {
                const thisIndex = selectedVariables.indexOf(variable);
                console.log(thisIndex);
                let newVariables = [];
                selectedVariables.map((myVariable, index) => {
                  if (index !== thisIndex) {
                    newVariables.push(myVariable);
                  }
                  setSelectedVariables(newVariables);
                });
              }}
            />
          </div>
        </Box>
        {isColorPicker && (
          <SketchPicker
            color={variable.color}
            onChangeComplete={(color) => {
              changeVariableAttribute("color", color["hex"]);
            }}
          />
        )}
      </div>
    </Draggable>
  );
};
