import { useState, useEffect, useContext } from 'react';
import { adminViewKYCstatus,setKYCStatus } from '../Scripts/apiCalls';

const UserDetailsScript = () => {
    const [btnStatus, setBtnStatus] = useState("in_progress");
    const [reason, setReason] = useState("");
    const [trigger, setTrigger] = useState(false);
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
            Comment:""

        }
    );

    const [userDetailsPending, setUserDetailsPending] = useState([]);

    useEffect( () => {
        console.log(btnStatus);
        adminViewKYCstatus(btnStatus).then((res) => {
            if (res !== "Server error") {
                setUserDetailsPending(res.data);
            }
        });
    }, [btnStatus,userDetails]);



    const url =" http://127.0.0.1:8000"
   



    const handleclickList = (status,account_no) => {
        if(status === "in_progress"){
            let temp = userDetailsPending.find((user) => user.regId === account_no);
            setUserDetails(temp);
            setBtnStatus("in_progress");

        }else if(status === "Rejected"){
            let temp = userDetailsPending.find((user) => user.regId === account_no);
            setUserDetails(temp);
            setBtnStatus("Rejected");
        }else if(status === "Approved"){
            let temp = userDetailsPending.find((user) => user.regId === account_no);
            setUserDetails(temp);
            setBtnStatus("Approved");
        }else if(status === "Revoke"){
            let temp = userDetailsPending.find((user) => user.regId === account_no);
            setUserDetails(temp);
            setBtnStatus("Revoke");
        }    
    }

    const handleclickChange = (value) => {
        if(value === "in_progress"){
            setBtnStatus("in_progress");
            setUserDetails(
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
            )
        }else if(value === "rejected"){
            setBtnStatus("Rejected");
            setUserDetails(
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
            )
            
        }else if(value === "Approved"){
            setBtnStatus("Approved");
            setUserDetails(
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
            )
        }else if(value === "Revoke"){
            setBtnStatus("Revoke");
            setUserDetails(
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
            )
        }

    };

    const handlePopup = () => {
        setTrigger(!trigger);
    }

    const handleClickStatusBtn = (status,regId,reason="") => {
        if(status === "Approved"){
            console.log("in_progress");
            setKYCStatus("Approved",regId,reason).then((res) => {
                if (res !== "Server error") {
                    setUserDetails(
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
                    )
                    
                }
            });
        }else if(status === "Rejected"){

            console.log(reason);
            setKYCStatus("Rejected",regId,reason).then((res) => {
                if (res !== "Server error") {
                    setUserDetails(
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
                    )
                }
            });
        }
        else if(status === "Revoke"){
            setKYCStatus("Revoke",regId,reason).then((res) => {
                if (res !== "Server error") {
                    setUserDetails(
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
                    )
                }
            });
    }
    }

    return {
        btnStatus,
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
        url
    };
}

export default UserDetailsScript;