import "./education.css";
import SchoolIcon from "@mui/icons-material/School";
import WebIcon from "@mui/icons-material/Web";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import cert1 from "../../assets/certificate1.png";
import cert2 from "../../assets/certificate2.png";
import cert3 from "../../assets/certificate3.png";
import cert4 from "../../assets/certificate4.png";
import cert5 from "../../assets/certificate5.png";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import TemplateCert from "../templateCert/templateCert";
import CertCreator from "../certCreator/certCreator";
import Tooltip from "@mui/material/Tooltip";

const Education = ({ setView }) => {
  const recentTemplates = [cert1, cert2, cert3, cert4, cert5, cert1];
  const freeTemplates = [cert1, cert2, cert3, cert4, cert5, cert1];
  const paidTemplates = [cert1, cert2, cert3, cert4, cert5, cert1];

  const [isSidebar, setIsSidebar] = useState(true);

  const [isTemplateCreator, setIsTemplateCreator] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState({
    image: cert1,
    variables: [
      {
        variable: "Student Name",
        x_pos: "10",
        y_pos: "20",
        width: "30",
        height: "20",
        color: "#000000",
      },
      {
        variable: "Roll Number",
        x_pos: "10",
        y_pos: "60",
        width: "20",
        height: "10",
        color: "#123123",
      },
    ],
  });

  const navbuttons = [
    {
      text: "Certificates (Educational)",
      logo: (
        <div>
          <SchoolIcon />
          <WebIcon />
        </div>
      ),
    },
    {
      text: "Badges (Educational)",
      logo: (
        <div>
          <SchoolIcon />
          <WorkspacePremiumIcon />
        </div>
      ),
    },
    {
      text: "Certificates (Non Educational)",
      logo: (
        <div>
          <SportsHandballIcon />
          <WebIcon />
        </div>
      ),
    },
    {
      text: "Badges (Non Educational)",
      logo: (
        <div>
          <SportsHandballIcon />
          <WorkspacePremiumIcon />
        </div>
      ),
    },
    {
      text: "Others",
      logo: <MoreHorizIcon />,
    },
  ];

  const Sidebar = () => {
    return (
      <div style={{ display: "flex", position: "relative" }}>
        <div style={{ width: "50px", backgroundColor: "var(--darkshade2)" }}>
          {navbuttons.map((nav) => (
            <div
              className="educationnavbutton"
              style={{
                height: "60px",
                width: "50px",
                minWidth: "50px",
                maxWidth: "50px",
              }}
              key={"education-sector-nav-button-" + nav["text"]}
            >
              <Tooltip title={nav["text"]} placement="right-start">
                {nav["logo"]}
              </Tooltip>
            </div>
          ))}
        </div>
        <div
          className="educationsectorsidebar"
          style={{
            backgroundColor: "var(--darkshade1)",
            height: window.innerHeight - 50 + "px",
            width: isSidebar ? "500px" : "0px",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <button onClick={() => setIsTemplateCreator(true)}>
              Import Custom Template
            </button>
          </div>

          <div
            className="educationnavbutton"
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "0px",
              right: "-50px",
              backgroundColor: "var(--darkshade1)",
              zIndex: 1,
            }}
            onClick={() => setIsSidebar(!isSidebar)}
          >
            {isSidebar ? "<" : ">"}
          </div>

          <TemplateContainer
            templates={recentTemplates}
            heading="Recently Used"
          />
          <TemplateContainer
            templates={freeTemplates}
            heading="Free Templates"
          />
          <TemplateContainer
            templates={paidTemplates}
            heading="Premium Templates"
          />
        </div>
      </div>
    );
  };

  const TemplateContainer = ({ templates, heading }) => {
    return (
      <>
        <div
          style={{
            borderBottom: "1px solid white",
            padding: "10px",
          }}
        >
          {heading}
        </div>
        <div
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {templates.map((template) => (
            <div
              key={template}
              onClick={() => {
                setSelectedTemplate(template);
                setIsTemplateCreator(false);
              }}
            >
              <img src={template} alt="Template" width="150px" />
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "10px",
          }}
        >
          <button style={{ padding: "5px" }}>More...</button>
        </div>
      </>
    );
  };

  const MainPage = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: window.innerHeight - 50 + "px",
        }}
      >
        {isTemplateCreator ? (
          <CertCreator setView={setView} />
        ) : (
          <>
            {selectedTemplate === null ? (
              <div>Select Template</div>
            ) : (
              <TemplateCert templateData={selectedTemplate} setView={setView} />
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="educationSector">
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Sidebar />
        <MainPage />
      </div>
    </div>
  );
};

export default Education;
