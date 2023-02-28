import React from 'react';
import { useContext, useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DeleteIcon from "@mui/icons-material/Delete";
import { fileDownload } from "../Scripts/tools";
import { IconButton } from "@mui/material";
import { DashboardScript } from './dashboardScript';
import Chart from "react-apexcharts";

export const Contentdashboard = () => {
    const {isPrimary,onClickPrimary} = DashboardScript();
    const user = useContext(UserContext);
    
    
    
  return (
    <div className='contentdasboard'>
        { user.isSidebar === 1 && <div className='primarydetail'>
            <PrimaryDetails />
        </div> }
        {user.isSidebar === 2 && <div className='primarydetail'>
            <div className="heading-primarydetails">
                <h2>Analytics</h2>
            </div>
            <KPI />
           <PieChart />
        </div> 
        }
    </div>
  )
}

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
        <div className='heading-primarydetails'>
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

  const PieChart = () => {
    const user = useContext(UserContext);
    const userData = user.userData;
    // const series = [userData["total_certificates"],userData["total_souvenirs"],userData["total_loyalty_nfts"]];
    const series = [200,100];
    const series2 = [userData["storage_used"],userData["storage_limit"]-userData["storage_used"]];
  
    return (
      <>
        <div className="chart-box">
          <div className="certContainer" id="pie">
          <React.Fragment>
            <div className="container-fuild">
                <Chart type="donut"
                      width={500}
                      height={550}
                      
                      series={[series[0], series[1]]}
                      options={{
                        title:{text:"Total Certificates",align:"center",margin:5,style:{fontSize:"25px",fontWeight:"bold",marginBottom:"20px"}},
                            labels: [ 'Total General Certificates', 'Total Degree Certificates'],
                            colors: [ '#28C76F',  '#00CFDD']
                        }}
                >
  
                </Chart>
            </div>
        </React.Fragment>
          <div className="piedata">
            <h5 >Total Certificate :{ 300}</h5>
            <h5 >Total General Certificates : {200}</h5>
            <h5 >Total Degree Certificates :{100}</h5>
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
                        title:{text:"Total Storage",align:"center",margin:20,style:{fontSize:"25px",fontWeight:"bold"}},
                            labels: ['Used Storage', 'Empty Storage'],
                            colors: ['#3D85C1', '#85B5DD', '#28C76F', '#00E396', '#00CFDD']
                        }}
                >
  
                </Chart>
            </div>
        </React.Fragment>
        <div className="piedata">
          <h5 >Total Storage :{ userData["storage_limit"]} MB</h5>
          <h5 >Used Storage : {userData["storage_used"]} MB</h5>
          <h5 >Empty Storage : { userData["storage_limit"]-userData["storage_used"]} MB</h5>
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

  const KPI = () => {
    const user = useContext(UserContext);
    const userData = user.userData;
  
    return (
      <div className="certificatesectioncontainer1">
        <div className="certificatesissued1">
          <div className="heading3">{200}</div>
          <div className="heading2">Total General Certificate</div>
        </div>
          +
        <div className="certificatesissued1">
          <div className="heading3">{100}</div>
          <div className="heading2">Total Degree  Certificate</div>
        </div>
          =
        <div className="certificatesissued1">
          <div className="heading3">{300}</div>
          <div className="heading2">Total Certificate </div>
        </div>
      </div>
    );
  };
