import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserDetails from "./UserDetails";

function TabPanel(props) {
  const { value, users, update } = props;
  const filter = { 0: "in_progress", 1: "Approved", 2: "" };

  return (
    <div>
      <UserDetails users={users} filter={filter[value]} update={update} />
    </div>
  );
}

export default function UserDetailsContainer(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "750px",
        border: "1px solid white",
        borderRadius: "20px",
        padding: "20px",
        margin: "20px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending" sx={{ color: "white" }} />
          <Tab label="Approved" sx={{ color: "white" }} />
          <Tab label="All" sx={{ color: "white" }} />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
        users={props.users}
        update={props.update}
      ></TabPanel>
    </Box>
  );
}
