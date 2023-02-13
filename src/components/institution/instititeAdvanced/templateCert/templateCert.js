import { useState, useEffect } from "react";

const TemplateCert = (props) => {
  const { templateData, setView } = props;

  const [templateValues, setTemplateValues] = useState({});

  useEffect(() => {
    let myTemplateValues = {};
    templateData.variables.map((variable) => {
      myTemplateValues[variable["variable"]] = "";
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
      <div style={{ width: "100%", maxWidth: "720px", position: "relative" }}>
        <img
          src={templateData.image}
          alt={templateData.name}
          width="100%"
          style={{ top: "0px", left: "0px" }}
          id="cert-preview"
        />
        {templateData.variables.map((variable, index) => (
          <div
            key={"template-certificate-value" + variable + index}
            style={{
              position: "absolute",
              top: variable.y_pos + "%",
              left: variable.x_pos + "%",
              color: variable.color,
              width: variable.width + "%",
              height: variable.height + "%",
              textAlign: "center",
              fontSize: getTextHeight(variable.height),
            }}
          >
            {templateValues[variable.variable]}
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
              for={"template-certificate-variable" + variable.variable + index}
            >
              {variable.variable}:
            </label>
            <input
              type="text"
              id={"template-certificate-variable" + variable.variable + index}
              value={templateValues[variable.variable]}
              onChange={(e) => {
                let newTemplateValues = {};
                newTemplateValues[variable.variable] = e.target.value;
                setTemplateValues({ ...templateValues, ...newTemplateValues });
              }}
            />
          </div>
        ))}
      <button onClick={() => setView(2)}>Next {">"}</button>
    </div>
  );
};

export default TemplateCert;
