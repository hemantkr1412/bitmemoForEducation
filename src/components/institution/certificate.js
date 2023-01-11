import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const Certificate = (props) => {
  const { certData, width } = props;
  const BASE_URL = "http://localhost:8000/";

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

  const [textHeight, setTextHeight] = useState(0);

  const fontSize1 = textHeight * 1.6 + "px";
  const fontSize2 = textHeight * 4 + "px";
  const fontSize3 = textHeight * 4 + "px";
  const fontSize4 = textHeight * 2 + "px";
  const fontSize5 = textHeight * 1.4 + "px";

  const variable1value = certData["variable1"];
  const variable2value = certData["variable2"];

  useEffect(() => {
    let certWidth = width;
    setTextHeight(certWidth / 100);
  }, []);

  return (
    <div
      className="certDesigner"
      style={{ background: certColor, color: fontColor, width: width + "px" }}
    >
      {/* {logo1 !== undefined && (
        <img
          src={BASE_URL + "media/" + logo1}
          alt="Logo 1"
          height={textHeight * 10}
          width={textHeight * 15}
          style={{ left: "10px", top: "10px" }}
        />
      )}
      {logo2 !== undefined && (
        <img
          src={BASE_URL + "media/" + logo2}
          alt="Logo 1"
          height={textHeight * 10}
          width={textHeight * 15}
          style={{ right: "10px", top: "10px" }}
        />
      )} */}
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
        {/* {sign1 !== undefined && (
          <img
            src={BASE_URL + "media/" + sign1}
            alt="Signature"
            height={textHeight * 7}
            width={textHeight * 20}
          />
        )} */}
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
        {/* {sign2 !== undefined && (
          <img
            src={BASE_URL + "media/" + sign2}
            alt="Signature"
            height={textHeight * 7}
            width={textHeight * 20}
          />
        )} */}
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
        {/* {sign3 !== undefined && (
          <img
            src={BASE_URL + "media/" + sign3}
            alt="Signature"
            height={textHeight * 7}
            width={textHeight * 20}
          />
        )} */}
        <input
          type="text"
          value={signtext3}
          style={{
            fontSize: fontSize4,
          }}
        />
      </div>
    </div>
  );
};

export default Certificate;
