import { useState, useEffect } from "react";

const TemplateCert = (props) => {
  const { templateData, setView, setCertData } = props;
  const [templateValues, setTemplateValues] = useState({});

  useEffect(() => {
    let myTemplateValues = {};
    templateData.variables.map((variable) => {
      myTemplateValues[variable["name"]] = "";
    });
    setTemplateValues(myTemplateValues);
  }, [props]);

  const getTextHeight = (variableHeight) => {
    let fullheight = 200;
    try {
      fullheight = document.getElementById("cert-preview").offsetHeight;
    } catch {
      fullheight = 200;
    }
    let textHeight = parseInt((fullheight * variableHeight) / 100) + "px";
    return textHeight;
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
      <h2>{templateData.name}</h2>
      <div style={{ width: "100%", maxWidth: "720px", position: "relative" }}>
        <img
          src={templateData.base_image}
          alt={templateData.name}
          width="100%"
          style={{ top: "0px", left: "0px" }}
          id="cert-preview"
        />
        {templateData.variables.map((variable, index) => (
          <div
            key={"template-certificate-value" + variable.name + index}
            style={{
              position: "absolute",
              top:
                parseFloat(
                  parseFloat(variable.y_pos) - parseFloat(variable.height) / 2
                ) + "%",
              left:
                parseFloat(
                  parseFloat(variable.x_pos) - parseFloat(variable.width) / 2
                ) + "%",
              color: variable.color,
              width: variable.width + "%",
              height: variable.height + "%",
              textAlign: "center",
              fontSize: getTextHeight(variable.height),
            }}
          >
            {templateValues[variable.name]}
          </div>
        ))}
      </div>
      Enter Preview Values
      {templateData.variables.length > 0 &&
        templateData.variables.map((variable, index) => (
          <div
            key={"template-certificate-variable" + variable.variable + index}
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "1fr 2fr",
              gap: "20px",
              margin: "10px 0px",
            }}
          >
            <label
              htmlFor={"template-certificate-variable" + variable.name + index}
            >
              {variable.name}:
            </label>
            <input
              type="text"
              id={"template-certificate-variable" + variable.name + index}
              value={templateValues[variable.name]}
              onChange={(e) => {
                let newTemplateValues = {};
                newTemplateValues[variable.name] = e.target.value;
                setTemplateValues({ ...templateValues, ...newTemplateValues });
              }}
            />
          </div>
        ))}
      <button
        onClick={() => {
          setCertData(templateData);
          setView(2);
        }}
      >
        Next {">"}
      </button>
    </div>
  );
};

export default TemplateCert;
