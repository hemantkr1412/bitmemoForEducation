import "./landing.css";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import GavelIcon from "@mui/icons-material/Gavel";
import HomeIcon from "@mui/icons-material/Home";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState, useContext } from "react";
import Education from "../education/education";
import UserContext from "../../../../context/userContext/UserContext";
import NoWalletPage from "../../../connection/NoWalletPage";
import Connect from "../../../connection/Connect";
import KYC from "../../../kyc/kyc";
import Subscription from "../subscription/subscription";
import CertIssue from "../certIssue/certIssue";

const InstitutesLandingPage = () => {
  const user = useContext(UserContext);
  const [isSidebar, setIsSidebar] = useState(false);
  const [view, setView] = useState(0);
  const [certData, setCertData] = useState(null);

  const [sector, setSector] = useState({
    text: "Education",
    logo: <SchoolIcon fontSize="large" />,
  });
  const sectors = [
    {
      text: "Education",
      logo: <SchoolIcon fontSize="large" />,
    },
    {
      text: "Event Management",
      logo: <EmojiEventsIcon fontSize="large" />,
    },
    {
      text: "Healthcare",
      logo: <HealthAndSafetyIcon fontSize="large" />,
    },
    {
      text: "Legal",
      logo: <GavelIcon fontSize="large" />,
    },
    {
      text: "Real Estate",
      logo: <HomeIcon fontSize="large" />,
    },
    {
      text: "Sports",
      logo: <SportsHandballIcon fontSize="large" />,
    },
    {
      text: "Entertainment",
      logo: <CelebrationIcon fontSize="large" />,
    },
  ];

  const Sidebar = () => {
    const animation = isSidebar ? "sidebaropen" : "sidebarclose";
    const width = isSidebar ? "300px" : "0%";

    return (
      <div
        style={{
          width: isSidebar ? "100%" : "0px",
          backgroundColor: "var(--darkshade1)",
          position: "absolute",
          zIndex: 2,
        }}
        onClick={() => setIsSidebar(false)}
      >
        <div
          className="institiutesidebar"
          style={{
            width: width,
            height: "100vh",
            transform: isSidebar ? "scaleX(100%)" : "scaleX(0%)",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "800",
              borderBottom: "1px solid var(--secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
              height: "50px",
              padding: "0px 100px 0px 10px",
            }}
          >
            <button
              style={{ padding: "10px" }}
              onClick={() => setIsSidebar(!isSidebar)}
            >
              X
            </button>
            Sectors
          </div>
          {sectors.map((sector, index) => (
            <div
              className="sector"
              key={sector["text"] + "sector-for-Institution-Sidebar"}
              onClick={() => {
                setSector(sector);
                setIsSidebar(false);
              }}
            >
              {sector["logo"]}
              {sector["text"]}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Navbar = () => {
    return (
      <div className="institutenavbar" style={{ left: "0px", height: "50px" }}>
        {/* <MenuIcon
          fontSize="large"
          sx={{ margin: "0px 30px", "&:hover": { color: "var(--primary)" } }}
          onClick={() => setIsSidebar(!isSidebar)}
        /> */}
        {sector["logo"]}
        Institution
      </div>
    );
  };

  return (
    <div className="institutepageadvanced">
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <Sidebar />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Navbar />

          {!user.iswalletAvailable ? (
            <NoWalletPage />
          ) : !user.isConnected ? (
            <Connect />
          ) : user.userData.status !== "in_progress" ? (
            <KYC />
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "0px",
                width: "100%",
              }}
            >
              {view === 0 ? (
                <Subscription setView={setView} />
              ) : view == 1 ? (
                <Education
                  setView={setView}
                  setCertData={setCertData}
                  certData={certData}
                />
              ) : (
                <CertIssue setView={setView} certData={certData} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutesLandingPage;
