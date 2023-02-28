import "./Home.css";
import img1 from "./assets/img1.png";
import arraow from "./assets/Line 2.png";
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
import step1 from "./assets/step1.png";
import step2 from "./assets/step2.jpg";
import step3 from "./assets/step3.jpg";
import step4 from "./assets/step4.jpg"; 
import step5 from "./assets/step5.jpg";
import step6 from "./assets/step6.jpg";
import step7 from "./assets/step7.jpg";
import React from "react";
import UserContext from "../../context/userContext/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kpiApi } from "../Scripts/apiCalls";

const Home = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState(0);
  const [souvenirs, setSouvenirs] = useState(0);

  useEffect(() => {
    poppulateCertificates();
  }, []);

  const poppulateCertificates = async () => {
    kpiApi().then((res) => {
      setCertificates(res.certificates);
      setSouvenirs(res.souvenirs);
    });
  };
  return (
    <>
      {/* About Section ------------------- */}
      <div className="aboutSectionContainer">
        <div className="aboutsection">
          <div className="writing">
            <div className="mainheading">BitMemoir</div>
            <div> <span className="submainheading">For</span><span style={{marginLeft:"20px"}} className="mainheading">Education</span></div>
            <div className="secondheading">
              Transforming the education system
            </div>
            <button
              onClick={() => {
                let toScrollElement =
                  document.getElementById("whatisbitmemoir");
                toScrollElement.scrollIntoView();
              }}
            >
              Learn More
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
            <div> <span className="submainheading">For</span><span style={{marginLeft:"20px"}} className="mainheading">Education</span></div>
            <div className="secondheading">
            Transforming the education system
            </div>
            <button
              onClick={() => {
                let toScrollElement =
                  document.getElementById("whatisbitmemoir");
                toScrollElement.scrollIntoView();
              }}
            >
              Learn More
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
            <div className="heading">Blockchain For</div>
            <div className="heading" >Colleges And Universities</div>
            {/* <hr /> */}
            <div className="certificatesectioncontainer2">
            <div className="certificatesectioncontainer2part1">
              <div className="certificatesissued2">
                <div className="heading1">1</div>
                <div className="heading2">MICROCREDENTIALS </div>
                <div className="heading3">They Are Intended to Certify Career Path Ans Skills For The Workplace. They Also Apply To Short Course And Professional Update Cycles.</div>
              </div>
              <div className="certificatesissued2">
                <div className="heading1">2</div>
                <div className="heading2">PROOF OF PARTICIPATIONS</div>
                <div className="heading3">NFTs Intended To Accredit The Participation Of Member Of The Education Community In Acts And Events Of The Institution.</div>
              </div>
            </div>
            <div className="certificatesectioncontainer2part2">
              <div className="certificatesissued2">
                <div className="heading1">3</div>
                <div className="heading2">DISTINCTIONS AND AWARDS</div>
                <div className="heading3">Badges That Certify Distinctions And Recognitions Granted By The Institution To Its Teacher Or Students. Medals Of Honor, Best Average, Sports Achievement</div>
              </div>
              <div className="certificatesissued2">
                <div className="heading1">4</div>
                <div className="heading2">UNDERGRADUATE AND GRADUATE DEGREES</div>
                <div className="heading3">Qualification Granted By The Institution To Its Graduates Only (School,University And Postgraduate)</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      {/* How to use Section--------------------- */}
      <div className="howtousecontainer">
        <div className="whybitmemomaindiv">
          <div className="whybitmemoheading">
            <div className="howtouseheading">Why <br/> BitMemoir?</div>
            <div className="whybitmemotext">Transforming the eduDummy text A Private Ltd Company is a legal entity registered and formed under the 1956 Companies Act.</div>
            <div className="whybitmemoArrow"><img src={arraow} ></img></div>
          </div>

          
          <div className="howtouseimageleft">
            <div>
              {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1Q8fG0TtVAY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
              <iframe width="560" height="315" src="https://www.youtube.com/embed/pojWsn2KotU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Sections ---------------------------------------- */}

      {/* Why Bit Section ---------------------------------------- */}
      <div className="joinContainer">
        <div className="stepsheadingbtndiv">
            <div className="benefit">
              GENERATING DEGREE'S
            </div>
            <div className="benefit2">
              GENERATING CERTIFICATE
            </div>
        </div>
      </div>
      <div className="whybitcontainer">
         <div className="heading-1">Steps For </div>
        <div className="heading"> Issuing Certificates</div> 
        <div className="stepText">tHE WAY FOR AN INSTITUTION TO GENERATE UNIVERSITY OR SCHOOL DEGREES IN BLOCKCHAIN</div>

        

        <div className="stepscontainer">
          <div className="step">
            <div className="stepimg">
              <img src={step1} alt="" />
            </div>
            <div className="stepheading">
              STEP 01
            </div>
            <div className="steptext">
              The institution buys a plan according to their needs
            </div>
          </div>
          <div className="step">
            <div className="stepimg">
              <img src={step2} alt="" />
            </div>
            <div className="stepheading">
              STEP 02
            </div>
            <div className="steptext">
            We request the legal information and a note with the legal signature of the highest authority
            </div>
          </div>
          <div className="step">
            <div className="stepimg">
              <img src={step3} alt="" />
            </div>
            <div className="stepheading">
              STEP 03
            </div>
            <div className="steptext">
              Our company validates the institution as a secure account
            </div>
          </div>
          <div className="step">
            <div className="stepimg">
              <img src={step4} alt="" />
            </div>
            <div className="stepheading">
              STEP 04
            </div>
            <div className="steptext">
            he institution sends its models of university or school degrees
            </div>
          </div>
          
   
        </div>
        <div className="stepscontainer">
          <div className="step">
            <div className="stepimg">
              <img src={step7} alt="" />
            </div>
            <div className="stepheading">
              STEP 07
            </div>
            <div className="steptext">
            We enable the form so that the institution can complete it individually and issue the certificates
            </div>
          </div>
          <div className="step">
            <div className="stepimg">
              <img src={step6} alt="" />
            </div>
            <div className="stepheading">
              STEP 06
            </div>
            <div className="steptext">
            We make a new final validation query to the person in charge designated by the institution
            </div>
          </div>
          <div className="step">
            <div className="stepimg">
              <img src={step7} alt="" />
            </div>
            <div className="stepheading">
              STEP 05
            </div>
            <div className="steptext">
            We integrate the models in the platform enabled only for that institution
            </div>
          </div>
          
   
        </div>
        

          
  

        
        
      </div>
      {/* Join  */}
      <div className="joinContainer">
        <div className="joinContainerHeading">
            Join Now!
        </div>
        <div className="joinMainDiv">
          <div className="join">
            <div className="joinheading">
            <div className="joiningfee"> <sup className="dollar">$</sup>1.00
              <p className="permonth">Per Month</p>
            </div>
            </div>
            <div className="joinheading2">
              <div className="subjoinheading2">
                LESS THAN 1000 <br/> CERTIFICATE
              </div>
              <button className="joinbtn">BUY NOW</button>
            </div>
          </div>
          <div className="join">
            <div className="joinheading">
            <div className="joiningfee"> <sup className="dollar">$</sup>1.00
              <p className="permonth">Per Month</p>
            </div>
            </div>
            <div className="joinheading2">
              <div className="subjoinheading2">
                  LESS THAN 1000 <br/> CERTIFICATE
                </div>
                <button className="joinbtn">BUY NOW</button>
              </div>
          </div>
          <div className="join">
            <div className="joinheading">
            <div className="joiningfee"> <sup className="dollar">$</sup>1.00
              <p className="permonth">Per Month</p>
            </div>
            </div>
            <div className="joinheading2">
              <div className="subjoinheading2">
                  LESS THAN 1000 <br/> CERTIFICATE
                </div>
                <button className="joinbtn">BUY NOW</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
