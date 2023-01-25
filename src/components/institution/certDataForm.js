import { useEffect, useState, useContext } from "react";
import CertDataFormRow from "./certDataFormRow";
import CertDataExcel from "./certDataExcel";
import BackspaceIcon from "@mui/icons-material/Backspace";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { nftApi } from "../Scripts/apiCalls";
import UserContext from "../../context/userContext/UserContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadIcon from "@mui/icons-material/Download";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ErrorIcon from "@mui/icons-material/Error";
import { fileDownload } from "../Scripts/tools";
import { IconButton } from "@mui/material";

const CertDataForm = (props) => {
  const { setOpen, certNumber, certData } = props;
  const user = useContext(UserContext);
  const [serials, setSerials] = useState([]);
  const [rowStyle, setRowStyle] = useState("1fr 3fr 3fr 4fr 4fr 1fr 1fr");
  const [isSpreadsheet, setIsSpreadsheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponsePage, setIsResponsePage] = useState(false);
  const [resData, setResData] = useState([]);

  useEffect(() => {
    let myserials = [];
    for (let i = 0; i < parseInt(certNumber); i++) {
      myserials.push(i);
    }
    setSerials(myserials);

    if (certData["variable2"] === "" && certData["variable1"] === "")
      setRowStyle("1fr 4fr 4fr 1fr 1fr");
    else if (certData["variable2"] === "" || certData["variable1"] === "")
      setRowStyle("1fr 3fr 4fr 4fr 1fr 1fr");
    else setRowStyle("1fr 3fr 3fr 4fr 4fr 1fr 1fr");
  }, [props]);

  const getAllCerts = () => {
    let allCerts = [];
    serials.forEach((sno) => {
      let variable1 = "";
      let variable2 = "";
      let address = "";
      let email = "";

      if (isSpreadsheet) {
        try {
          variable1 = document.getElementById(
            "certExcelInput-" + certData["variable1"] + "-" + (sno + 1)
          ).value;
        } catch (err) {
          variable1 = "";
        }
        try {
          variable2 = document.getElementById(
            "certExcelInput-" + certData["variable2"] + "-" + (sno + 1)
          ).value;
        } catch (err) {
          variable2 = "";
        }
        address = document.getElementById(
          "certExcelInput-address-" + (sno + 1)
        ).value;
        email = document.getElementById(
          "certExcelInput-email-" + (sno + 1)
        ).value;
      } else {
        try {
          variable1 = document.getElementById(
            "variable-1-input-for-row-" + sno
          ).value;
        } catch (err) {
          variable1 = "";
        }
        try {
          variable2 = document.getElementById(
            "variable-2-input-for-row-" + sno
          ).value;
        } catch (err) {
          variable2 = "";
        }
        address = document.getElementById("address-input-for-row-" + sno).value;
        email = document.getElementById("email-input-for-row-" + sno).value;
      }

      allCerts.push({
        variable1: variable1,
        variable2: variable2,
        address: address,
        email: email,
      });
    });
    return allCerts;
  };

  if (isResponsePage)
    return <ResponsePage res={resData} handleBack={() => setOpen(false)} />;

  return (
    <div className="certIssueFormContainer">
      {isLoading && <LoadingPage />}
      <div className="buttonContainer">
        <button onClick={() => setOpen(false)}>
          <BackspaceIcon sx={{ fontSize: 20 }} />
          <span style={{ marginLeft: "10px" }}>Back</span>
        </button>
        <button onClick={() => setOpen(false)}>
          Issue All
          <DescriptionIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
        </button>
      </div>

      {isSpreadsheet ? (
        <button
          onClick={() => setIsSpreadsheet(false)}
          style={{ margin: "auto" }}
        >
          Close Spreadsheet
          <CancelPresentationIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
        </button>
      ) : (
        <>
          <h3>Already have an excel sheet prepared?</h3>
          <button
            onClick={() => setIsSpreadsheet(true)}
            style={{ margin: "auto" }}
          >
            Copy/Paste from Excel/Spreadsheet
            <BorderAllIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
          </button>
        </>
      )}
      {isSpreadsheet ? (
        <CertDataExcel
          setOpen={setIsSpreadsheet}
          certNumber={certNumber}
          certData={certData}
        />
      ) : (
        <>
          <div
            className="certDataFormContainer"
            style={{ gridTemplateColumns: rowStyle }}
          >
            <h3>S.No.</h3>
            {certData["variable1"] !== "" && <h3>{certData["variable1"]}</h3>}
            {certData["variable2"] !== "" && <h3>{certData["variable2"]}</h3>}
            <h3>Recipient Address</h3>
            <h3>Recipient Email</h3>
          </div>

          {serials.map((sno) => (
            <CertDataFormRow
              key={sno + "SerialCertNumber"}
              sno={sno}
              certData={certData}
            />
          ))}
        </>
      )}
      <button
        style={{ margin: "auto" }}
        onClick={() => {
          setIsLoading(true);
          const allCerts = getAllCerts();
          nftApi({
            account: user.userAccount,
            all_certs: JSON.stringify(allCerts),
            template: certData["name"],
          })
            .then(async (res) => {
              console.log(res);
              setIsLoading(false);
              setIsResponsePage(true);
              setResData(res);
            })
            .catch((err) => {
              setIsLoading(false);
              alert("Something went wrong. Please try again.");
            });
        }}
      >
        Issue all Certificates
        <DescriptionIcon sx={{ fontSize: 20, marginLeft: "10px" }} />
      </button>
    </div>
  );
};

export default CertDataForm;

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

const ResponsePage = (props) => {
  const { res, handleBack } = props;

  return (
    <>
      <div className="resContainer" style={{ borderBottom: "1px solid white" }}>
        <h3>S.No.</h3>
        <h3>Recipient</h3>
        <h3>Status</h3>
        <h3>TokenId</h3>
        <h3>Download</h3>
      </div>
      {res.map((cert, index) => {
        return (
          <div key={"cert" + index} className="resContainer">
            <h3>{index + 1}</h3>
            <h3>{cert["recipient"]}</h3>
            {cert["status"] === "Success" ? (
              <CheckBoxIcon color="success" />
            ) : (
              <ErrorIcon color="error" />
            )}
            {cert["status"] === "Success" && <h3>{cert["token_id"]}</h3>}
            {cert["status"] === "Success" && (
              <IconButton
                color="primary"
                onClick={() => fileDownload(cert["image"], cert["recipient"])}
              >
                <DownloadIcon />
              </IconButton>
            )}
          </div>
        );
      })}
      <button onClick={() => handleBack()}>OK</button>
    </>
  );
};
