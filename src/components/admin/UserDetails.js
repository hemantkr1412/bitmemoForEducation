import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./admin.css";
import { fileDownload } from "../Scripts/tools";
import { useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import { userApi } from "../Scripts/apiCalls";

export default function UserDetails(props) {
  const appuser = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [isRejecting, setIsRejecting] = React.useState(false);
  const { users, filter, update } = props;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {users.length > 0 &&
        users.map((user) => {
          if (user.status === filter || filter === "") {
            return (
              <Accordion
                expanded={expanded === user.account}
                onChange={handleChange(user.account)}
                key={user.account}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {user.name === "" ? "Anonymous" : user.name}
                  </Typography>
                  <Typography
                    sx={{ color: "text.secondary", wordBreak: "break-word" }}
                  >
                    {user.account}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="userdetailTable">
                    <div>Name: </div>
                    <div>{user.name === "" ? "Anonymous" : user.name}</div>
                    <div>Email: </div>
                    <div>{user.email}</div>
                    <div>Website: </div>
                    <div>{user.website}</div>
                    <div>Contact: </div>
                    <div>{user.contact}</div>
                    <div>Description: </div>
                    <div>{user.description}</div>
                    <div>NFT quota: </div>
                    <div>{user.nft_quota}</div>
                    <div>Storage Limit: </div>
                    <div>{user.storage_limit}MB</div>
                    <div>Storage used: </div>
                    <div>{user.storage_used}MB</div>
                    <div>Comment: </div>
                    <div>{user.comment}</div>
                    <div>Account: </div>
                    <div>{user.account}</div>
                    <div>Contract Address: </div>
                    <div>{user.contract_address}</div>
                    <div>Status: </div>
                    <div>{user.status}</div>
                    <div>Id Proof: </div>
                    {user.idProof === "" ? (
                      "Not found"
                    ) : (
                      <a
                        onClick={() => {
                          fileDownload(user.idProof, user.name);
                        }}
                      >
                        Download
                      </a>
                    )}
                    {isRejecting && <div>Reason:</div>}
                    {isRejecting && (
                      <input
                        type="text"
                        id={"rejectionReason" + user.account}
                        placeholder="Provide reason for rejecting/revoking"
                      />
                    )}

                    <div></div>
                    <div className="buttonContainer">
                      {user.status === "in_progress" && (
                        <button
                          onClick={() => {
                            console.log({
                              account: user.account,
                              admin: appuser.userAccount,
                              status: "Approved",
                              comment: "",
                            });
                            userApi({
                              account: user.account,
                              admin: appuser.userAccount,
                              status: "Approved",
                              comment: "",
                            })
                              .then((res) => {
                                update();
                              })
                              .catch((err) => {
                                alert(
                                  "Something went wrong. Please try again."
                                );
                              });
                          }}
                        >
                          Approve
                        </button>
                      )}
                      {user.status === "in_progress" && (
                        <button
                          onClick={() => {
                            if (!isRejecting) {
                              setIsRejecting(true);
                            } else {
                              userApi({
                                account: user.account,
                                admin: appuser.userAccount,
                                status: "Rejected",
                                comment: document.getElementById(
                                  "rejectionReason" + user.account
                                ).value,
                              })
                                .then((res) => {
                                  console.log(res);
                                  update();
                                  setIsRejecting(false);
                                })
                                .catch((err) => {
                                  alert(
                                    "Something went wrong. Please try again."
                                  );
                                });
                            }
                          }}
                        >
                          Reject
                        </button>
                      )}
                      {user.status === "Approved" && (
                        <button
                          onClick={() => {
                            if (!isRejecting) {
                              setIsRejecting(true);
                            } else {
                              userApi({
                                account: user.account,
                                admin: appuser.userAccount,
                                status: "Revoked",
                                comment: document.getElementById(
                                  "rejectionReason" + user.account
                                ).value,
                              })
                                .then((res) => {
                                  console.log(res);
                                  update();
                                  setIsRejecting(false);
                                })
                                .catch((err) => {
                                  alert(
                                    "Something went wrong. Please try again."
                                  );
                                });
                            }
                          }}
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          } else return null;
        })}
    </div>
  );
}
