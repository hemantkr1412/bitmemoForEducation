import UserDetailsScript from "./UserDetailsScript";



import React from 'react'

export const InnerPopup = (props) => {
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
    <div className="popup-box">
    <div className="popup-box-header">
        <h2>{props.heading}</h2>
    </div>
    <div className="popup-box-body">
        <textarea name="reason" id="reason" cols="30" rows="10" onChange={(e) => setReason(e.target.value)}></textarea>
    </div>
    <div className="popup-box-footer">
        <button  id='blueBtn' onClick={() => (
            console.log("clicked",props.status),
            handleClickStatusBtn(props.status,userDetails.regId,reason),
            setTrigger(false)
        )}>Submit</button>
    </div>
    </div>  
  )
}

