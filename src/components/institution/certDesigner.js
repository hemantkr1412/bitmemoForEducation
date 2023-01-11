import { useEffect, useState, useContext } from "react";
import { SketchPicker } from "react-color";
import bitLogo from "../assets/BITlogo.png";
import sign1image from "./assets/sign1.png";
import sign2image from "./assets/sign2.png";
import palette from "./assets/palette.png";
import CertPreview from "./certPreview";
import QRCode from "react-qr-code";
import UserContext from "../../context/userContext/UserContext";
import { userApi } from "../Scripts/apiCalls";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SaveIcon from "@mui/icons-material/Save";
import ForwardIcon from "@mui/icons-material/Forward";

const CertDesigner = (props) => {
  const goBack = () => props.setOpen(false);
  const user = useContext(UserContext);
  const [text1, setText1] = useState("CERTIFICATE");
  const [text2, setText2] = useState("OF APPRECIATION");
  const [text3, setText3] = useState(
    "THIS CERTIFICATE IS PROUDLY PRESENTED TO"
  );
  const [text4, setText4] = useState("ROLL NO.");
  const [text5, setText5] = useState(
    "This is to certify that he/she has actively participated "
  );
  const [text6, setText6] = useState(
    "and successfully completed a four year degree program in the field of "
  );
  const [text7, setText7] = useState(
    "Software Engineering and is hereby awarded the title of Bachelor of Engineering."
  );
  const [text8, setText8] = useState(
    "This is a verifiable certificate. To verify the certificate, scan the QR code given below"
  );
  const [text9, setText9] = useState(
    "or visit bitmemoir.com/verify and enter the unique certificate identification number"
  );
  const [text10, setText10] = useState("given below.");

  const [signtext1, setsigntext1] = useState("Principal");
  const [signtext2, setsigntext2] = useState("Director");
  const [signtext3, setsigntext3] = useState("Ass. Director");

  const [variable1, setVariable1] = useState("STUDENT NAME");
  const [variable2, setVariable2] = useState("Roll Number");

  const [logo1, setlogo1] = useState(bitLogo);
  const [logo2, setlogo2] = useState(bitLogo);

  const [sign1, setsign1] = useState(sign1image);
  const [sign2, setsign2] = useState(sign2image);
  const [sign3, setsign3] = useState(sign2image);

  const [logo1file, setlogo1file] = useState();
  const [logo2file, setlogo2file] = useState();

  const [sign1file, setsign1file] = useState();
  const [sign2file, setsign2file] = useState();
  const [sign3file, setsign3file] = useState();

  const [certColor, setCertColor] = useState("#FFFFFF");
  const [fontColor, setFontColor] = useState("#000000");
  const [backgroundColorPicker, setbackgroundColorPicker] = useState(false);
  const [fontColorPicker, setfontColorPicker] = useState(false);

  const [textHeight, setTextHeight] = useState(0);

  const [isPreview, setIsPreview] = useState(false);

  const certData = {
    text1: text1,
    text2: text2,
    text3: text3,
    text4: text4,
    text5: text5,
    text6: text6,
    text7: text7,
    text8: text8,
    text9: text9,
    text10: text10,

    signtext1: signtext1,
    signtext2: signtext2,
    signtext3: signtext3,

    variable1: variable1,
    variable2: variable2,

    logo1: logo1file,
    logo2: logo2file,
    sign1: sign1file,
    sign2: sign2file,
    sign3: sign3file,

    certColor: certColor,
    fontColor: fontColor,
  };
  const certDataForPreview = {
    text1: text1,
    text2: text2,
    text3: text3,
    text4: text4,
    text5: text5,
    text6: text6,
    text7: text7,
    text8: text8,
    text9: text9,
    text10: text10,

    signtext1: signtext1,
    signtext2: signtext2,
    signtext3: signtext3,

    variable1: variable1,
    variable2: variable2,

    logo1: logo1file !== undefined ? logo1 : "",
    logo2: logo2file !== undefined ? logo2 : "",
    sign1: sign1file !== undefined ? sign1 : "",
    sign2: sign2file !== undefined ? sign2 : "",
    sign3: sign3file !== undefined ? sign3 : "",

    certColor: certColor,
    fontColor: fontColor,
  };

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

  if (isPreview)
    return <CertPreview certData={certDataForPreview} setOpen={setIsPreview} />;

  return (
    <div className="designCertPage">
      <h1>Certificate designer</h1>
      <h3>Click anywhere to edit</h3>
      <div
        className="certDesigner"
        style={{ background: certColor, color: fontColor }}
      >
        {!backgroundColorPicker && (
          <img
            src={palette}
            alt="Color picker"
            className="palette"
            onClick={() => setbackgroundColorPicker(true)}
          />
        )}
        {backgroundColorPicker && (
          <div className="colorPicker">
            <h2>Background Color</h2>
            <SketchPicker
              color={certColor}
              onChangeComplete={(color) => setCertColor(color["hex"])}
            />
            <h1 onClick={() => setbackgroundColorPicker(false)}>X</h1>
          </div>
        )}
        {!fontColorPicker && (
          <img
            src={palette}
            alt="Color picker"
            className="palette"
            style={{ top: "60%" }}
            onClick={() => setfontColorPicker(true)}
          />
        )}
        {fontColorPicker && (
          <div className="colorPicker">
            <h2>Font Color</h2>
            <SketchPicker
              color={fontColor}
              onChangeComplete={(color) => setFontColor(color["hex"])}
            />
            <h1 onClick={() => setfontColorPicker(false)}>X</h1>
          </div>
        )}
        <img
          src={logo1}
          alt="Logo 1"
          height={textHeight * 10}
          width={textHeight * 15}
          style={{ left: "10px", top: "10px" }}
          onClick={() => document.getElementById("logo1-selector").click()}
        />
        <img
          src={logo2}
          alt="Logo 1"
          height={textHeight * 10}
          width={textHeight * 15}
          style={{ right: "10px", top: "10px" }}
          onClick={() => document.getElementById("logo2-selector").click()}
        />
        <input
          type="text"
          key="text1"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          style={{
            fontSize: fontSize2,
            top: fontSize3,
            width: "50%",
          }}
        />
        <input
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 9 + "px",
            width: "50%",
          }}
        />
        <input
          type="text"
          value={text3}
          onChange={(e) => setText3(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 15 + "px",
          }}
        />

        <input
          type="text"
          value={variable1}
          onChange={(e) => setVariable1(e.target.value)}
          style={{
            fontSize: fontSize3,
            top: textHeight * 17 + "px",
            fontStyle: "italic",
          }}
        />
        <input
          type="text"
          value={text4}
          onChange={(e) => setText4(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 22 + "px",
          }}
        />
        <input
          type="text"
          value={variable2}
          onChange={(e) => setVariable2(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 24 + "px",
            fontStyle: "italic",
          }}
        />
        <input
          type="text"
          value={text5}
          onChange={(e) => setText5(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 28 + "px",
          }}
        />
        <input
          type="text"
          value={text6}
          onChange={(e) => setText6(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 30 + "px",
          }}
        />
        <input
          type="text"
          value={text7}
          onChange={(e) => setText7(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 32 + "px",
          }}
        />
        <input
          type="text"
          value={text8}
          onChange={(e) => setText8(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 35 + "px",
          }}
        />
        <input
          type="text"
          value={text9}
          onChange={(e) => setText9(e.target.value)}
          style={{
            fontSize: fontSize1,
            top: textHeight * 37 + "px",
          }}
        />
        <input
          type="text"
          value={text10}
          onChange={(e) => setText10(e.target.value)}
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
          <img
            src={sign1}
            alt="Signature"
            height={textHeight * 7}
            width={textHeight * 20}
            onClick={() => document.getElementById("sign1-selector").click()}
          />
          <input
            type="text"
            value={signtext1}
            onChange={(e) => setsigntext1(e.target.value)}
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
          <img
            src={sign2}
            alt="Signature"
            height={textHeight * 7}
            width={textHeight * 20}
            onClick={() => document.getElementById("sign2-selector").click()}
          />
          <input
            type="text"
            value={signtext2}
            onChange={(e) => setsigntext2(e.target.value)}
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
          <img
            src={sign3}
            alt="Signature"
            height={textHeight * 7}
            width={textHeight * 20}
            onClick={() => document.getElementById("sign3-selector").click()}
          />
          <input
            type="text"
            value={signtext3}
            onChange={(e) => setsigntext3(e.target.value)}
            style={{
              fontSize: fontSize4,
            }}
          />
        </div>
        <input
          type="file"
          id="logo1-selector"
          onChange={(e) => {
            let file = e.target.files[0];
            setlogo1file(file);
            let filereader = new FileReader();
            filereader.addEventListener("load", () => {
              setlogo1(filereader.result);
            });
            filereader.readAsDataURL(file);
          }}
          style={{
            display: "none",
          }}
        />
        <input
          type="file"
          id="logo2-selector"
          onChange={(e) => {
            let file = e.target.files[0];
            setlogo2file(file);
            let filereader = new FileReader();
            filereader.addEventListener("load", () => {
              setlogo2(filereader.result);
            });
            filereader.readAsDataURL(file);
          }}
          style={{
            display: "none",
          }}
        />
        <input
          type="file"
          id="sign1-selector"
          onChange={(e) => {
            let file = e.target.files[0];
            setsign1file(file);
            let filereader = new FileReader();
            filereader.addEventListener("load", () => {
              setsign1(filereader.result);
            });
            filereader.readAsDataURL(file);
          }}
          style={{
            display: "none",
          }}
        />
        <input
          type="file"
          id="sign2-selector"
          onChange={(e) => {
            let file = e.target.files[0];
            setsign2file(file);
            let filereader = new FileReader();
            filereader.addEventListener("load", () => {
              setsign2(filereader.result);
            });
            filereader.readAsDataURL(file);
          }}
          style={{
            display: "none",
          }}
        />
        <input
          type="file"
          id="sign3-selector"
          onChange={(e) => {
            let file = e.target.files[0];
            setsign3file(file);
            let filereader = new FileReader();
            filereader.addEventListener("load", () => {
              setsign3(filereader.result);
            });
            filereader.readAsDataURL(file);
          }}
          style={{
            display: "none",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          marginBottom: "20px",
        }}
      >
        <label htmlFor="certificate-template-name">Template name: </label>
        <input
          type="text"
          id="certificate-template-name"
          style={{ margin: "20px", width: "90%" }}
          placeholder="e.g. My first certificate"
        />
      </div>
      <div className="buttonContainer">
        <button onClick={goBack}>
          <BackspaceIcon sx={{ fontSize: 20, marginRight: "10px" }} />
          Back
        </button>
        <button
          onClick={() => {
            let certTemplate = document.getElementById(
              "certificate-template-name"
            ).value;
            if (certTemplate === "") {
              alert("Please provide a name for the template.");
              return null;
            }
            let certificates = {
              ...certData,
              status: "active",
              name: certTemplate,
            };
            let certificatesJson = JSON.stringify(certificates);
            userApi({
              account: user.userAccount,
              certificates: certificatesJson,
              logo1: logo1file,
              logo2: logo2file,
              sign1: sign1file,
              sign2: sign2file,
              sign3: sign3file,
            })
              .then((res) => {
                goBack();
                user.poppulateUserData();
              })
              .catch((err) => {
                alert("Something went wrong. Please try again.");
              });
          }}
        >
          Save
          <SaveIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
        </button>
        <button onClick={() => setIsPreview(true)}>
          Preview
          <ForwardIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
        </button>
      </div>
    </div>
  );
};

export default CertDesigner;
