import uploadIcon from "../../assets/uploadIcon.jpg";
import { useState, useContext, useEffect } from "react";
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
import { templateApi } from "../../../Scripts/apiCalls";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserContext from "../../../../context/userContext/UserContext";

const CertCreator = ({ setIsTemplateCreator, setSelectedTemplate, sector }) => {
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedVariables, setSelectedVariables] = useState([]);
  const [selectedVariablesData, setSelectedVariablesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [imageWidth, setImageWidth] = useState(100);
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    setImageWidth(Math.min(window.innerWidth - 100, 700));
  }, [window]);

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

  const handleNext = async () => {
    setIsLoading(true);
    await templateApi({
      request_type: "create",
      account: user.userAccount,
      variables: JSON.stringify(selectedVariablesData),
      base_image: uploadedImage,
      name: templateName,
      sector: sector,
      category: "custom",
      subscription: "user",
    })
      .then((res) => {
        console.log(res);
        setIsTemplateCreator(false);
        setSelectedTemplate(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again.");
      });

    setIsLoading(false);
  };

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
      id="tempate-creater-container"
    >
      <h2>Template Creator</h2>
      <input
        type="file"
        id="image-selector"
        style={{ display: "none" }}
        onChange={(e) => selectImage(e.target.files[0])}
      />
      <div
        style={{
          width: imageWidth.toString() + "px",
          position: "relative",
        }}
      >
        <img
          src={selectedImage}
          alt="Custom Template"
          width={imageWidth}
          style={{ top: "0px", left: "0px" }}
          id="cert-creator-preview"
          onClick={() => document.getElementById("image-selector").click()}
        />
        {selectedVariables.length > 0 &&
          selectedVariables.map((variable) => (
            <DragVariable
              variable={variable}
              selectedVariables={selectedVariables}
              selectedVariablesData={selectedVariablesData}
              setSelectedVariables={setSelectedVariables}
              setSelectedVariablesData={setSelectedVariablesData}
              imageWidth={imageWidth}
              key={"variable-added-by-dragging-" + variable.name}
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
                name: document.getElementById("draggable-variable-selector")
                  .value,
                x_pos: "0",
                y_pos: "0",
                width: "30",
                height: "5",
                color: "#000000",
              },
            ]);
            setSelectedVariablesData([
              ...selectedVariablesData,
              {
                name: document.getElementById("draggable-variable-selector")
                  .value,
                x_pos: "50",
                y_pos: "50",
                width: "30",
                height: "5",
                color: "#000000",
              },
            ]);
          }}
        >
          Add Variable +
        </button>

        <label htmlFor="template-creater-template-name">Template Name</label>
        <input
          type="text"
          id="template-creater-template-name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            handleNext();
          }}
        >
          Next {">"}
        </button>
      </div>
      {isLoading && <LoadingPage />}
    </div>
  );
};

export default CertCreator;

const DragVariable = ({
  variable,
  selectedVariables,
  selectedVariablesData,
  setSelectedVariables,
  setSelectedVariablesData,
  imageWidth,
}) => {
  const [isColorPicker, setIsColorPicker] = useState(false);

  const startingPositionX = 50 - parseFloat(variable.width) / 2 + "%";
  const startingPositionY = 50 - parseFloat(variable.height) + "%";
  const imageHeight = document.getElementById(
    "cert-creator-preview"
  ).offsetHeight;

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

  const changeVariablePosition = (data) => {
    let x_pos =
      Math.round(
        (50 + (parseFloat(data.x) / parseFloat(imageWidth)) * 100) * 100
      ) / 100;
    let y_pos =
      Math.round(
        (50 + (parseFloat(data.y) / parseFloat(imageHeight)) * 100) * 100
      ) / 100;

    let newVariablesData = [];
    selectedVariablesData.map((myvariable) => {
      if (myvariable.name === variable.name) {
        myvariable["x_pos"] = x_pos;
        myvariable["y_pos"] = y_pos;
      }
      newVariablesData.push(myvariable);
    });
    setSelectedVariablesData(newVariablesData);
  };

  const changeVariableAttribute = (attributename, valueChange) => {
    let newVariables = [];
    selectedVariables.map((myvariable) => {
      if (myvariable.name === variable.name) {
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

    let newVariablesData = [];
    selectedVariablesData.map((myvariable) => {
      if (myvariable.name === variable.name) {
        if (attributename === "color") {
          myvariable[attributename] = valueChange;
        } else {
          myvariable[attributename] =
            parseInt(myvariable[attributename]) + valueChange;
        }
      }
      newVariablesData.push(myvariable);
    });
    setSelectedVariablesData(newVariablesData);
  };
  return (
    <Draggable
      handle="#handle"
      bounds={{
        left: -imageWidth / 2 + (parseFloat(variable.width) * imageWidth) / 200,
        top:
          -imageHeight / 2 + (parseFloat(variable.height) * imageHeight) / 200,
        right: imageWidth / 2 - (parseFloat(variable.width) * imageWidth) / 200,
        bottom:
          imageHeight / 2 - (parseFloat(variable.height) * imageHeight) / 200,
      }}
      onDrag={(e, data) => {
        changeVariablePosition(data);
      }}
    >
      <div
        style={{
          position: "absolute",
          top: startingPositionY,
          left: startingPositionX,
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
            {variable.name}
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

const LoadingPage = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
