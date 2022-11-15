import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserList } from './UserList';
import { UserDetailsDataPending,UserDetailsDataRejected,UserDetailsDataVerified } from '../../Data/UserDetailsData';

export const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(
        {
            account_no:"",
            name:"",
            website:"",
            email:"",
            phone:"",
            CIN:"",
            NameOfId :"",
            IdProof:"",

        }
    );

    const [btnStatus, setBtnStatus] = useState("Pending");



    const handleclickList = (status,account_no) => {
        if(status === "Pending"){
            let temp = UserDetailsDataPending.find((user) => user.account_no === account_no);
            setUserDetails(temp);
            setBtnStatus("Pending");

        }else if(status === "Rejected"){
            let temp = UserDetailsDataRejected.find((user) => user.account_no === account_no);
            setUserDetails(temp);
            setBtnStatus("Rejected");
        }else if(status === "Verified"){
            let temp = UserDetailsDataVerified.find((user) => user.account_no === account_no);
            setUserDetails(temp);
            setBtnStatus("Verified");
        }    
    }

    const handleclickChange = (value) => {
        if(value === "pending"){
            setBtnStatus("Pending");
        }else if(value === "rejected"){
            setBtnStatus("Rejected");
        }else if(value === "Approved"){
            setBtnStatus("Verified");
        }

    };


  return (
    // <div className='userDetails'>
    //     <h2>User Details</h2>
    //     <div className='userDetailsBox'>
    //         <div className='userDetailsLeft'>
    //             <div className="pendingBox">
    //                 <div className='pendingBoxHeader'>
    //                     <h3>Pending Verification</h3>
    //                 </div>
    //                 <div className="pendingList">
    //                     {UserDetailsDataPending.map((val,index)=>{
    //                         return (
    //                         <div onClick={(e) => handleclickList("Pending",val.account_no)}>
    //                             <UserList key={index} account={val.account_no} srl_no={index} />
    //                         </div>
    //                         );
    //                     })}
    //                 </div>
    //             </div>
    //             <div className="rejectedBox">
    //                 <h3>Rejected Verification</h3>
    //                 <div className="pendingList">
    //                     {UserDetailsDataRejected.map((val,index)=>{
    //                         return (
    //                         <div onClick={(e) => handleclickList("Rejected",val.account_no)}>
    //                             <UserList key={index} account={val.account_no} srl_no={index} />
    //                         </div>
    //                         );
    //                     })}
    //                 </div>
    //             </div>
    //             <div className="approvedBox">
    //                 <h3>Verified</h3>
    //                 <div className="pendingList">
    //                     {UserDetailsDataVerified.map((val,index)=>{
    //                         return (
    //                         <div onClick={(e) => handleclickList("Verified",val.account_no)}>
    //                             <UserList key={index} account={val.account_no} srl_no={index} />
    //                         </div>
    //                         );
    //                     })}
    //                 </div>
    //             </div>
    //         </div>

    //         <div className='userDetailsRight'>
    //             <h3>Details</h3>
    //            <div className="individualUserDetails">
    //                 <div className="individualUserDetailsFormat">
    //                     <p> Account : </p>
    //                     <p> Name : </p>
    //                     <p>Website :</p>
    //                     <p> Email : </p>
    //                     <p> Phone : </p>
    //                     <p>CIN :</p>
    //                     <p>Document :</p>
    //                     <p>NameOfId:</p>
    //                     <p>IdProof:</p>
    //                 </div>
    //                 <div className="individualUserDetailsData">
    //                     <p> {userDetails.account_no}</p>
    //                     <p> {userDetails.name}</p>
    //                     <p>{userDetails.website}</p>
    //                     <p>{userDetails.email}</p>
    //                     <p> {userDetails.phone}</p>
    //                     <p>{userDetails.CIN}</p>
    //                     {btnStatus &&<button >Download</button>}
    //                     <p>{userDetails.NameOfId}</p>
    //                     <p>{userDetails.IdProof}</p>
    //                 </div>

    //            </div>
    //            {btnStatus==="Pending"&&<div className="btn-box">
    //               <button >Approve</button>
    //               <button>Reject</button>
    //            </div>}
    //            {btnStatus==="Rejected"&&<div className="btn-box">
    //               <button>Approve</button>
    //            </div>}
    //            {btnStatus==="Verified"&&<div className="btn-box">
    //               <button>Revoke</button>
    //            </div>}
    //         </div>
    //     </div>
    // </div>

    <div className='userDetails2'>
        <h2>User Details</h2>
        <div className='userDetailsBox2'>

            <div className='userDetailsLeft2'>
                <div className='listSelector'>
                    <select name="lists" id="lists" onClick={(e) => handleclickChange(e.target.value)}>
                        <option value="pending">Pending Verification</option>
                        <option value="rejected">Rejected Verification</option>
                        <option value="Approved">Verified</option>
                    </select>
                </div>
                <div className="userDetailsLeftChild">
                    <div className="">
                    <tr>
                        <th>Sr No.</th>
                        <th>Account</th>
                    </tr> 
                    </div>
                    <div >
                       {btnStatus==="Pending"&&UserDetailsDataPending.map((val,index)=>{
                            return (
                            <div onClick={(e) => handleclickList("Pending",val.account_no)}>
                                <UserList key={index} account={val.account_no} srl_no={index} />
                            </div>
                            );
                        })}
                        {btnStatus==="Rejected"&&UserDetailsDataRejected.map((val,index)=>{
                            return (
                            <div onClick={(e) => handleclickList("Rejected",val.account_no)}>
                                <UserList key={index} account={val.account_no} srl_no={index} />
                            </div>
                            );
                        })}
                        {btnStatus==="Verified"&&UserDetailsDataVerified.map((val,index)=>{
                            return (
                            <div onClick={(e) => handleclickList("Verified",val.account_no)}>
                                <UserList key={index} account={val.account_no} srl_no={index} />
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <p className='vl'></p>
            <div className='userDetailsRight2'>
                     <div id="detailsHeader">Details</div>
            <div className="individualUserDetails">
                 <div className="individualUserDetailsFormat">
                     <p> Account : </p>
                     <p> Name : </p>
                     <p>Website :</p>
                     <p> Email : </p>
                     <p> Phone : </p>
                     <p>CIN :</p>
                     <p>Id:</p>
                     <p>IdProof:</p>
                 </div>
                  <div className="individualUserDetailsData">
                        <p> {userDetails.account_no}</p>
                        <p> {userDetails.name}</p>
                        <p>{userDetails.website}</p>
                     <p>{userDetails.email}</p>
                     <p> {userDetails.phone}</p>
                    <p>{userDetails.CIN}</p>
                    <p>{userDetails.NameOfId}</p>
                    {userDetails.name != "" &&<button href={userDetails.IdProof} >Download</button>}
                 </div>

            </div>
               {btnStatus==="Pending"&&<div className="btn-box">
               <button id='approveBtn'>Approve</button>
                  <button id='rejectBtn'>Reject</button>
            </div>}
               {btnStatus==="Rejected"&&<div className="btn-box">
                  <button id='approveBtn'>Approve</button>
               </div>}
               {btnStatus==="Verified"&&<div className="btn-box">
                   <button id='revokedBtn'>Revoke</button>
               </div>}
            </div>
        </div>
                        


    </div>
  );
}
