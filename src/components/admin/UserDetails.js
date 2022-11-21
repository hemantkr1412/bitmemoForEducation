import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserList } from './UserList';
import { UserDetailsDataPending,UserDetailsDataRejected,UserDetailsDataVerified } from '../../Data/UserDetailsData';
import { adminViewKYCstatus,setKYCStatus } from '../Scripts/apiCalls';
import { Popup } from './Popup';
import UserDetailsScript from './UserDetailsScript';
import { InnerPopup } from './InnerPopup';


export const UserDetails = () => {
    const {btnStatus,
        setBtnStatus,
        userDetailsPending,
        handleclickList,
        handleclickChange,
        userDetails,
        handlePopup,
        trigger,
        setTrigger,
        handleClickStatusBtn,
        setReason,
        reason,
        url} = UserDetailsScript();
    
  return (
    <div className='userDetails2'>
        <h2>User Details</h2>
        <div className='userDetailsBox2'>

            <div className='userDetailsLeft2'>
                <div className='listSelector'>
                    <select name="lists" id="lists" onClick={(e) => handleclickChange(e.target.value)}>
                        <option value="in_progress">Pending Verification</option>
                        <option value="rejected">Rejected Verification</option>
                        <option value="Approved">Verified</option>
                        <option value="Revoke">Revoked</option>     
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
                       {
                        btnStatus==="in_progress" && userDetailsPending.map((val,index)=>{ 
                            return (
                            <div onClick={(e) => handleclickList("in_progress",val.regId)}>
                                <UserList key={index} account={val.regId} srl_no={index} />
                            </div>
                            );
                        })
                        
                        } 

                        {btnStatus==="Rejected"&& userDetailsPending.map((val,index)=>{
                            return (
                            <div onClick={(e) => handleclickList("Rejected",val.regId)}>
                                <UserList key={index} account={val.regId} srl_no={index} />
                            </div>
                            );
                        })
                        
                        }

                        {
                        
                            btnStatus==="Approved" && 
                            
                            userDetailsPending.map((val,index)=>{
                                return (
                                <div onClick={(e) => handleclickList("Approved",val.regId)}>
                                    <UserList key={index} account={val.regId} srl_no={index} />
                                </div>
                                );
                            })
                        
                        }

                        {
                        
                            btnStatus==="Revoke" && 
                            
                            userDetailsPending.map((val,index)=>{
                                return (
                                <div onClick={(e) => handleclickList("Revoke",val.regId)}>
                                    <UserList key={index} account={val.regId} srl_no={index} />
                                </div>
                                );
                            })
                        
                        }
                    </div>
                </div>
            </div>
            <p className='vl'></p>
            <div className='userDetailsRight2'>
                     <div id="detailsHeader">Details</div>
            <div className="individualUserDetails">
                 <div className="individualUserDetailsFormat">
                     <p> Name : </p>
                     <p>Website :</p>
                     <p> Email : </p>
                     <p> Phone : </p>
                     <p>CIN :</p>
                     <p>IdProof:</p>
                     {(btnStatus==="Rejected" || btnStatus==="Revoke" ) && <p>Reason :</p>}
                 </div>
                  <div className="individualUserDetailsData">
                    <p> {userDetails.name}</p>
                    <p>{userDetails.website}</p>
                     <p>{userDetails.email}</p>
                     <p> {userDetails.contact}</p>
                    <p>{userDetails.regId}</p>
                    {userDetails.name != "" && 
                    
                    // <button onClick={(e) => downloadBtn(userDetails.idProof)}>Download!</button>
                    <a href={url+userDetails.idProof} download="MyExampleDoc" target='_blank'>
                            <button >View</button>
                    </a>
                    
                    }
                    {(userDetails.name != "" && (btnStatus==="Rejected" || btnStatus==="Revoke" ) ) &&
                    
                    // <button onClick={(e) => downloadBtn(userDetails.idProof)}>Download!</button>
                    <div iv className="btn-box">

                            <button id='blueBtnView' onClick={() => handlePopup()} >View Reason</button>
                            <Popup trigger={trigger} setTrigger={setTrigger}>
                                <h2>Reason</h2>
                                <h5>{userDetails.comment}</h5>
                            </Popup>

                    </div>
                    
                    }
                 </div>

            </div>
               {btnStatus==="in_progress"&&
                    <div className="btn-box">
                    <button id='approveBtn' onClick={() => handleClickStatusBtn("Approved",userDetails.regId)}>Approve</button>
                    <button id='rejectBtn' onClick={() => handlePopup()}>Reject</button>
                    <Popup trigger={trigger} setTrigger={setTrigger} >
                    <div className="popup-box">
                        <div className="popup-box-header">
                            <h2>Reason for Rejection</h2>
                        </div>
                        <div className="popup-box-body">
                            <textarea name="reason" id="reason" cols="30" rows="10" onChange={(e) => setReason(e.target.value)}></textarea>
                        </div>
                        <div className="popup-box-footer">
                            <button  id='blueBtn' onClick={() => (
                                handleClickStatusBtn("Rejected",userDetails.regId,reason),
                                setTrigger(false)
                            )}>Submit</button>
                        </div>
                        </div> 
                    </Popup>
                    </div>
                }
               {btnStatus==="Rejected" &&
                <div className="btn-box">
                    <button id='approveBtn' onClick={() => handleClickStatusBtn("Approved",userDetails.regId)}>Approve</button>
                </div>
               }

               {btnStatus==="Approved"&&
                <div className="btn-box">
                    <button id='revokedBtn' onClick={() => handlePopup()}>Revoke</button>
                    <Popup trigger={trigger} setTrigger={setTrigger}>
                        <div className="popup-box">
                        <div className="popup-box-header">
                            <h2>Reason for Revoke</h2>
                        </div>
                        <div className="popup-box-body">
                            <textarea name="reason" id="reason" cols="30" rows="10" onChange={(e) => setReason(e.target.value)}></textarea>
                        </div>
                        <div className="popup-box-footer">
                            <button  id='blueBtn' onClick={() => (
                                handleClickStatusBtn("Revoke",userDetails.regId,reason),
                                setTrigger(false)
                            )}>Submit</button>
                        </div>
                        </div>  
                    </Popup>

                </div>
               }

               {btnStatus==="Revoke" &&
                    <div className="btn-box">
                        <button id='approveBtn' onClick={() => handleClickStatusBtn("Approved",userDetails.regId)}>Approve</button>
                    </div>
                }
            </div>
        </div>

    </div>
  );
}
