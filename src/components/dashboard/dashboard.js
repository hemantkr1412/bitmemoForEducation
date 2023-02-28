import "./dashboard.css";
import { useContext, useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DeleteIcon from "@mui/icons-material/Delete";
import { fileDownload } from "../Scripts/tools";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { userApi, nftApi } from "../Scripts/apiCalls";
import Dialog from "@mui/material/Dialog";
import Certificate from "../institution/certificate";
import React from "react";
import Chart from "react-apexcharts";
import { SubNavbar } from "./SubNavbar";
import { SideBar } from "./SideBar";
import { Contentdashboard } from "./Contentdashboard";

const Dashboard = () => {
  return (
    // <div className="dashboardpage">
    //   <div className="dashboardcontainer">
    //     <SubNavbar />
    //     {/* <PrimaryDetails />
    //     <KPI />
        
    //     <PieChart /> */}
    //     {/* <PieChart2 /> */}
       
    //     {/* <Templates />
    //     <Frames /> */}
    //   </div>
    // </div>
    // <div className="dashboardmain">
    //   <SubNavbar />
    //   <SideBar />
    // </div>
    <div className="dashboardpage1">
      <SubNavbar />
      <div className="dashboardmain">
        <SideBar />
        <Contentdashboard />
      </div>
    </div>
  );
};

export default Dashboard;

const PrimaryDetails = () => {
  const user = useContext(UserContext);
  const userData = user.userData;

  const details1 = {
    Name: userData.name,
    Description: userData.description,
    Email: userData.email,
    Website: userData.website,
    Account: userData.account,
  };
  const details2 = {
    Status:
      userData.status === "Approved"
        ? "Verified"
        : userData.status === "in_progress"
        ? "Verification Pending"
        : "Unverified",
    "Reg. Id": userData.regId,
    "Id Proof": (
      <IconButton onClick={() => fileDownload(userData.idProof, "idProof")}>
        <DownloadForOfflineIcon color="primary" />
      </IconButton>
    ),
    "Personal storage":
      userData["storage_used"] + " / " + userData["storage_limit"] + " MB",
    "Contract Address": userData["contract_address"],
  };

  return (
    <>
      <div className="sectionheading">
        <h2>Primary Details</h2>
      </div>
      <div className="primarydatacontainer">
        <div className="userdetail">
          {Object.keys(details1).map((item) => (
            <div className="userdetails" key={item + "inuserData1"}>
              <h4>{item}:</h4>
              <h4>{details1[item]}</h4>
            </div>
          ))}
        </div>
        <div className="userdetail">
          {Object.keys(details2).map((item) => (
            <div className="userdetails" key={item + "inuserData2"}>
              <h4>{item}:</h4>
              <h4>{details2[item]}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


const KPI = () => {
  const user = useContext(UserContext);
  const userData = user.userData;

  return (
    <div className="certificatesectioncontainer">
      <div className="certificatesissued">
        <div className="heading3">{userData["total_certificates"]}</div>
        <div className="heading2">Total certificates issued</div>
      </div>

      <div className="certificatesissued">
        <div className="heading3">{userData["total_souvenirs"]}</div>
        <div className="heading2">Total souvenirs issued</div>
      </div>
      <div className="certificatesissued">
        <div className="heading3">{userData["total_loyalty_nfts"]}</div>
        <div className="heading2">Total Loyalty NFTs</div>
      </div>
    </div>
  );
};



const Templates = () => {
  const user = useContext(UserContext);
  const userData = user.userData;
  const templateNames = Object.keys(userData?.["certificates"]);

  const deleteTemplate = async (template) => {
    userApi({
      account: user.userAccount,
      delete_certificate: true,
      template: template,
      certificates: "",
    })
      .then(async (res) => {
        console.log(res);
        await user.poppulateUserData();
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  };

  const downloadTemplate = async (template) => {
    nftApi({
      account: user.userAccount,
      recipient: "walletAddress",
      cert: "download",
      template: template,
      variable1: userData["certificates"][template]["variable1"],
      variable2: userData["certificates"][template]["variable2"],
    })
      .then(async (res) => {
        fileDownload(res, "sample");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="sectionheading">
        <h2>Certificate Templates</h2>
      </div>
      <div className="certContainer">
        {templateNames.length > 0 && (
          <>
            {templateNames.map((template, index) => (
              <div className="framecard" key={index + template}>
                <div className="framepreview">
                  <Certificate
                    certData={userData["certificates"][template]}
                    width={250}
                  />
                </div>
                <div className="framebuttons">
                  <DownloadForOfflineIcon
                    color="white"
                    onClick={() => downloadTemplate(template)}
                  />
                  <DeleteIcon
                    color="white"
                    onClick={() => deleteTemplate(template)}
                  />
                </div>
                <h4>{template}</h4>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};


const PieChart = () => {
  const user = useContext(UserContext);
  const series = [30,20,45];
  const series2 = [800,200];

  return (
    <>
      <div className="sectionheading">
        <h2>Dashboard</h2>
      </div>
      <div className="chart-box">
        <div className="certContainer" id="pie">
        <React.Fragment>
          <div className="container-fuild">
              <Chart type="donut"
                    width={500}
                    height={550}
                    
                    series={[series[1], series[0], series[2]]}
                    options={{
                      title:{text:"Pie Chart",margin:20,style:{fontSize:"25px",fontWeight:"bold"}},
                          labels: ['Total certificates', 'Total General certificates', 'Total Degree certificates'],
                          colors: ['#FF4560', '#FFB64D', '#28C76F', '#00E396', '#00CFDD']
                      }}
              >

              </Chart>
          </div>
      </React.Fragment>
        <div className="piedata">
          <h5 >Total Certificates : 200</h5>
          <h5 >General Certificate: 130</h5>
          <h5 >Total Degree Certificate : 70</h5>
        </div>
          
      </div>

      <div className="certContainer" id="pie">
        <React.Fragment>
          <div className="container-fuild">
              <Chart type="pie"
                    width={500}
                    height={550}
                    
                    series={[series2[0], series2[1]]}
                    options={{
                      title:{text:"Total Storage",margin:20,style:{fontSize:"25px",fontWeight:"bold"}},
                          labels: ['Used Storage', 'Empty Storage'],
                          colors: ['#3D85C1', '#85B5DD', '#28C76F', '#00E396', '#00CFDD']
                      }}
              >

              </Chart>
          </div>
      </React.Fragment>
      <div className="piedata">
        <h5 >Total Storage : 1000 MB</h5>
        <h5 >Used Storage : 800 MB </h5>
        <h5 >Empty Storage : 200 MB</h5>
      </div>
          
      </div>
    </div>

{/*     
    <div className="certContainer" id="bargraph">
    <React.Fragment>
        <div className="container-fuild">
            <Chart type="bar"
                    width={800}
                    height={550}
                    series={[{
                        name: 'Total Certificates',
                        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 80, 40 ]
                    }]}
                    options={{
                        title:{text:"Month Data Bargraph",align:"center",margin:20,style:{fontSize:"25px",fontWeight:"bold"}},
                        chart: {
                            type: 'bar',
                            height: 350
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '55%',
                                endingShape: 'rounded'
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            show: true,
                            width: 2,
                            colors: ['transparent']
                        },
                        xaxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            
                        },
                        yaxis: {
                            title: {
                                text: 'Total Certificates'
                            }
                        },
                        fill: {
                            opacity: 1
                        },
                        tooltip: {
                            y: {
                                formatter: function (val) {
                                    return  val + " Certificates"
                                }
                            }
                        }
                    }}
            >

            </Chart>
        </div>
    </React.Fragment>
          
      </div> */}
    </>
  );
};






const PieChart2 = () => {
  const user = useContext(UserContext);
  const series = [200,800];

  return (
    <>
      <div className="certContainer" id="pie">
      <React.Fragment>
        <div className="container-fuild">
            <Chart type="pie"
                   width={500}
                   height={550}
                   
                   series={[series[1], series[0], series[2]]}
                   options={{
                    title:{text:"Storage",margin:20,style:{fontSize:"25px",fontWeight:"bold"}},
                        labels: ['Used Storage', 'Empty Storage'],
                        colors: ['#FF4560', '#FFB64D', '#28C76F', '#00E396', '#00CFDD']
                     }}
            >

            </Chart>
        </div>
    </React.Fragment>
    <div className="piedata">
      <h5 >Total Storage : 1000MB</h5>
      <h5 >Used Storage : 200</h5>
      <h5 >Empty : 800</h5>
    </div>
        
      </div>
    </>
  );
};
