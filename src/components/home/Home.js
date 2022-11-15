import "./Home.css";
import img1 from "./assets/img1.png";
import howtouseimage1 from "./assets/howtouseimage1.png";
import howtouseimage2 from "./assets/howtouseimage2.png";
import howtouseimage3 from "./assets/howtouseimage3.png";
import solutionimg1 from "./assets/solutionimg1.png";
import solutionimg2 from "./assets/solutionimg2.png";
import solutionimg3 from "./assets/solutionimg3.png";
import solutionimg4 from "./assets/solutionimg4.png";
import solutionimg5 from "./assets/solutionimg5.png";
import solutionimg6 from "./assets/solutionimg6.png";
import digitalcertimage from "./assets/digitalcertimage.png";
import bulk from "./assets/bulk.svg";
import cerifycert from "./assets/cerifycert.svg";
import dataprotection from "./assets/dataprotection.svg";
import integration from "./assets/integration.svg";
import robustinfra from "./assets/robustinfra.svg";

import React from "react";
import UserContext from "../../context/userContext/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNumberOfCertificates } from "../Scripts/apiCalls";

const Home = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const solutionsData = [
    {
      image: solutionimg1,
      heading: "Digital Certificates for Universities",
      text: "Real-time issuing of verifiable digital certificates to students.",
    },
    {
      image: solutionimg2,
      heading: "Digital Certificates for Schools",
      text: "With BitMemoir, you can offer everything from grade reports to diplomas for sports, music, dance, and yearly functions.",
    },
    {
      image: solutionimg3,
      heading: "Digital Certificates for Training and Coaching Institutes",
      text: "Verifiable certificates for training and coaching institutions.",
    },
    {
      image: solutionimg4,
      heading: "Digital Certificates for Individuals",
      text: "File and certificate storage for individuals is secured via blockchain. There's no need to lug around your certificate binder.",
    },
    {
      image: solutionimg5,
      heading: "Digital Certificates for Events",
      text: "With BitMemoir, you can hand out prizes and attendance certificates with just a click at your next event.",
    },
    {
      image: solutionimg6,
      heading: "Digital Certificates for Destinations",
      text: "Digital Certificates for Destinations Verified digital souvenirs for holiday destinations.",
    },
  ];

  const [certificates, setCertificates] = useState(0);
  const [souvenirs, setSouvenirs] = useState(0);

  useEffect(() => {
    poppulateCertificates();
  }, []);

  const poppulateCertificates = async () => {
    await getNumberOfCertificates().then((res) => {
      console.log(res);
      if (res != "Server error") {
        let onlyCertificates = res.credentials["only_certificates"];
        let onlySouvenirs = res.credentials["only_souvenirs"];
        setCertificates(onlyCertificates);
        setSouvenirs(onlySouvenirs);
      }
    });
  };
  return (
    <>
      {/* About Section ------------------- */}
      <div className="aboutSectionContainer">
        <div className="aboutsection">
          <div className="writing">
            <div className="mainheading">BitMemoir</div>
            <div className="secondheading">
              All digital records and memories over Blockchain
            </div>
            <button
              onClick={() => {
                let toScrollElement =
                  document.getElementById("whatisbitmemoir");
                toScrollElement.scrollIntoView();
              }}
            >
              <a>Learn More</a>
            </button>
          </div>
          <div className="illustration">
            <img src={img1} alt="" />
          </div>
        </div>
        <div className="aboutsectionmobile">
          <div className="illustration">
            <img src={img1} alt="" />
          </div>
          <div className="writing">
            <div className="mainheading">BitMemoir</div>
            <div className="secondheading">
              All digital records and memories over Blockchain
            </div>
            <button>
              <a>Learn More</a>
            </button>
          </div>
        </div>
        <div className="nextpagearrowcontainer">
          <div className="nextpagearrow"></div>
        </div>
      </div>
      {/* BitMemoir Description Section ------------------------ */}
      <div className="descriptionsectioncontainer" id="whatisbitmemoir">
        <div className="descriptionsection">
          <div className="writing">
            <div className="heading">What is BitMemoir</div>
            <div>
              BitMemoir is a web3 based application that enables individuals and
              organisations to provide authorised clients with digital
              certifications. Individual users can convert personal identifiers,
              property documents, and other sensitive materials into digital
              certificates, or NFTs, and store them in their own wallets. By
              utilising blockchain technology, BitMemoir enables users to own
              their personal documents in perpetuity.
            </div>
          </div>
        </div>
      </div>
      {/* Certificates Section------------------------ */}
      <div className="certificatesectioncontainer">
        <div className="certificatesissued">
          <div className="heading1">Total number of</div>
          <div className="heading2">Certificates Issued: </div>
          <div className="heading3">{certificates}</div>
        </div>
        <div className="certificatesissued">
          <div className="heading1">Total number of</div>
          <div className="heading2">Souvenirs Issued:</div>
          <div className="heading3">{souvenirs}</div>
        </div>
      </div>
      {/* How to use Section--------------------- */}
      <div className="howtousecontainer">
        <div className="howtouseheading">How to use BitMemoir</div>
        <div className="howtousesection">
          <div className="howtouseimageright">
            <img src={howtouseimage1} alt="" />
          </div>
          <div className="howtousetextleft">
            For educational institutions including schools, colleges, and
            universities.
            <button onClick={() => navigate("instituteinfo")}>Know More</button>
          </div>
          <div className="howtouseillustrationright">
            <div className="illustrationtop">
              <div className="dot"></div>
            </div>
            <div className="illustrationbottom"></div>
          </div>
        </div>

        <div className="howtousesection">
          <div className="howtouseillustrationleft">
            <div className="illustrationtop">
              <div className="dot"></div>
            </div>
            <div className="illustrationbottom"></div>
          </div>

          <div className="howtousetextright">
            For hotels, resorts, events and travel destinations.
            <button onClick={() => navigate("destinationinfo")}>
              Know More
            </button>
          </div>

          <div className="howtouseimageleft">
            <img src={howtouseimage2} alt="" />
          </div>
        </div>
        <div className="howtousesectionmobile">
          <div className="howtousesection">
            <div className="howtouseillustrationleft">
              <div className="illustrationtop">
                <div className="dot"></div>
              </div>
              <div className="illustrationbottom"></div>
            </div>

            <div className="howtouseimageright">
              <img src={howtouseimage2} alt="" />
            </div>

            <div className="howtousetextleft">
              For hotels, resorts, events and travel destinations.
              <button onClick={() => navigate("destinationinfo")}>
                Know More
              </button>
            </div>
          </div>
        </div>

        <div className="howtousesection">
          <div className="howtouseimageright">
            <img src={howtouseimage3} alt="" />
          </div>
          <div className="howtousetextleft">
            For individuals.
            <button onClick={() => navigate("individualinfo")}>
              Know More
            </button>
          </div>
          <div className="howtouseillustrationright">
            <div className="illustrationtop">
              <div className="dot"></div>
            </div>
            <div className="illustrationbottom"></div>
          </div>
        </div>
      </div>

      {/* Solution Sections ---------------------------------------- */}
      <div className="solutionsectioncontainer">
        <div className="solutionsheading">Our Solutions</div>
        We Empower Individuals, Institutions and Organizations
        <div className="solutionscardscontainer">
          {solutionsData.map((solution) => {
            return (
              <div className="solutionscard" key={solution.heading}>
                <img src={solution.image} alt={solution.heading} />
                <div className="cardheading">{solution.heading}</div>
                <div className="cardtext">{solution.text}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Digital certificate Section------------------------------ */}
      <div className="digitalcertcontainer">
        <img src={digitalcertimage} alt="Digital certificate" />
        <div className="digitalcerttext">
          <div className="heading">What is a Digital Certificate?</div>A digital
          certificate, also known as a public key certificate, is used to
          cryptographically link ownership of a public key with the entity that
          owns it. Digital certificates are for sharing public keys to be used
          for encryption and authentication.
        </div>
      </div>
      {/* Why Bit Section ---------------------------------------- */}
      <div className="whybitcontainer">
        <div className="heading">Why BitMemoir?</div>
        BitMemoir provides many benefits
        <div className="benefitscontainer">
          <div className="benefit">
            <img src={robustinfra} alt="bit infrastructure" />
            Robust Infrastructure
          </div>
          <div className="benefitdivider">
            <div className="dividerleft"></div>
            <div className="dividerright"></div>
          </div>
          <div className="benefit">
            <img src={integration} alt="Bit Integration" />
            Seamless Integration
          </div>
          <div className="benefitdivider">
            <div className="dividerleft"></div>
            <div className="dividerright"></div>
          </div>
          <div className="benefit">
            <img src={dataprotection} alt="Bit Protection" />
            Data Protection
          </div>
          <div className="benefitdivider">
            <div className="dividerleft"></div>
            <div className="dividerright"></div>
          </div>
          <div className="benefit">
            <img src={cerifycert} alt="Bit Certificate" />
            Verifiable Certificates
          </div>
          <div className="benefitdivider">
            <div className="dividerleft"></div>
            <div className="dividerright"></div>
          </div>
          <div className="benefit">
            <img src={bulk} alt="Bit Bulk certs" />
            Bulk Issuance
          </div>
          <div className="benefitdivider">
            <div className="dividerleft"></div>
            <div className="dividerrightwithdot">
              <div className="dot"></div>
            </div>
          </div>
          {!user.isConnected && (
            <div className="purplebutton">
              <button
                onClick={() => {
                  if (user.iswalletAvailable) {
                    user.login();
                  } else {
                    navigate("/wallet");
                  }
                }}
              >
                Connect now {">"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
