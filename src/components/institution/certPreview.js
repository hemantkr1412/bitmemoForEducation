import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ForwardIcon from "@mui/icons-material/Forward";

const CertPreview = (props) => {
  const { certData, setOpen } = props;

  const {
    text1,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
    text8,
    text9,
    text10,
    signtext1,
    signtext2,
    signtext3,
    variable1,
    variable2,
    logo1,
    logo2,
    sign1,
    sign2,
    sign3,
    certColor,
    fontColor,
  } = certData;

  const [variable1value, setvariable1value] = useState("");
  const [variable2value, setvariable2value] = useState("");

  const [isPreview, setIsPreview] = useState(false);
  const [textHeight, setTextHeight] = useState(0);

  const fontSize1 = textHeight * 1.6 + "px";
  const fontSize2 = textHeight * 4 + "px";
  const fontSize3 = textHeight * 4 + "px";
  const fontSize4 = textHeight * 2 + "px";
  const fontSize5 = textHeight * 1.4 + "px";

  useEffect(() => {
    let windowWidth = parseInt(window.innerWidth);
    console.log(windowWidth);
    let certWidth = windowWidth > 1120 ? 1080 : windowWidth - 40;
    setTextHeight(certWidth / 100);
  }, []);

  return (
    <div className="designCertPage">
      <h1>Certificate Preview</h1>

      {!isPreview ? (
        <div className="certPreviewForm">
          {variable1 !== "" && (
            <>
              <label htmlFor="variable-1">{variable1}:</label>
              <input
                type="text"
                id="variable-1"
                value={variable1value}
                onChange={(e) => setvariable1value(e.target.value)}
              />
            </>
          )}

          {variable2 !== "" && (
            <>
              <label htmlFor="variable-2">{variable2}:</label>
              <input
                type="text"
                id="variable-2"
                value={variable2value}
                onChange={(e) => setvariable2value(e.target.value)}
              />
            </>
          )}
          <button onClick={() => setIsPreview(true)}>
            Enter
            <ForwardIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
          </button>
        </div>
      ) : (
        <div
          className="certDesigner"
          style={{ background: certColor, color: fontColor }}
        >
          {logo1 !== "" && (
            <img
              src={logo1}
              alt="Logo 1"
              height={textHeight * 10}
              width={textHeight * 15}
              style={{ left: "10px", top: "10px" }}
            />
          )}
          {logo2 !== "" && (
            <img
              src={logo2}
              alt="Logo 1"
              height={textHeight * 10}
              width={textHeight * 15}
              style={{ right: "10px", top: "10px" }}
            />
          )}
          <input
            type="text"
            key="text1"
            value={text1}
            style={{
              fontSize: fontSize2,
              top: fontSize3,
              width: "50%",
            }}
          />
          <input
            type="text"
            value={text2}
            style={{
              fontSize: fontSize1,
              top: textHeight * 9 + "px",
              width: "50%",
            }}
          />
          <input
            type="text"
            value={text3}
            style={{
              fontSize: fontSize1,
              top: textHeight * 15 + "px",
            }}
          />

          <input
            type="text"
            value={variable1value}
            style={{
              fontSize: fontSize3,
              top: textHeight * 17 + "px",
            }}
          />
          <input
            type="text"
            value={text4}
            style={{
              fontSize: fontSize1,
              top: textHeight * 22 + "px",
            }}
          />
          <input
            type="text"
            value={variable2value}
            style={{
              fontSize: fontSize1,
              top: textHeight * 24 + "px",
            }}
          />
          <input
            type="text"
            value={text5}
            style={{
              fontSize: fontSize1,
              top: textHeight * 28 + "px",
            }}
          />
          <input
            type="text"
            value={text6}
            style={{
              fontSize: fontSize1,
              top: textHeight * 30 + "px",
            }}
          />
          <input
            type="text"
            value={text7}
            style={{
              fontSize: fontSize1,
              top: textHeight * 32 + "px",
            }}
          />
          <input
            type="text"
            value={text8}
            style={{
              fontSize: fontSize1,
              top: textHeight * 35 + "px",
            }}
          />
          <input
            type="text"
            value={text9}
            style={{
              fontSize: fontSize1,
              top: textHeight * 37 + "px",
            }}
          />
          <input
            type="text"
            value={text10}
            style={{
              fontSize: fontSize1,
              top: textHeight * 39 + "px",
            }}
          />

          <QRCode
            size={256}
            bgColor={certColor}
            fgColor={fontColor}
            style={{
              position: "absolute",
              top: textHeight * 45 + "px",
              left: "50%",
              transform: "translateX(-100%)",
              width: textHeight * 8 + "px",
              height: textHeight * 8 + "px",
              backgroundColor: certColor,
            }}
            value={"https://bitmemoir.com/verify"}
            viewBox={`0 0 256 256`}
          />

          <div
            className="certverification"
            style={{
              top: textHeight * 45 + "px",
              fontSize: fontSize5,
            }}
          >
            <span>Contract: </span>
            <span>123456789</span>
            <span>Token ID: </span>
            <span>001 </span>
            <span>Chain ID: </span>
            <span>137 </span>
          </div>

          <div
            className="signcontainer"
            style={{
              width: textHeight * 30 + "px",
              height: textHeight * 10 + "px",
            }}
          >
            {sign1 !== "" && (
              <img
                src={sign1}
                alt="Signature"
                height={textHeight * 7}
                width={textHeight * 20}
              />
            )}
            <input
              type="text"
              value={signtext1}
              style={{
                fontSize: fontSize4,
              }}
            />
          </div>
          <div
            className="signcontainer"
            style={{
              width: textHeight * 30 + "px",
              height: textHeight * 10 + "px",
              left: "50%",
              transform: "translate(-50%, 0%)",
            }}
          >
            {sign2 !== "" && (
              <img
                src={sign2}
                alt="Signature"
                height={textHeight * 7}
                width={textHeight * 20}
              />
            )}
            <input
              type="text"
              value={signtext2}
              style={{
                fontSize: fontSize4,
              }}
            />
          </div>
          <div
            className="signcontainer"
            style={{
              width: textHeight * 30 + "px",
              height: textHeight * 10 + "px",
              right: "0px",
            }}
          >
            {sign3 !== "" && (
              <img
                src={sign3}
                alt="Signature"
                height={textHeight * 7}
                width={textHeight * 20}
              />
            )}
            <input
              type="text"
              value={signtext3}
              style={{
                fontSize: fontSize4,
              }}
            />
          </div>
        </div>
      )}

      <button onClick={() => setOpen(false)}>
        <BackspaceIcon sx={{ fontSize: 20, marginRight: "10px" }} />
        Back
      </button>
    </div>
  );
};

export default CertPreview;
