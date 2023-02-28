import React from 'react';
import { DashboardScript } from './dashboardScript';
import { useContext, useState } from "react";
import UserContext from "../../context/userContext/UserContext";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import QueryStatsIcon from '@mui/icons-material/QueryStats';


export const SideBar = () => {
    const {isPrimary,onClickPrimary} = DashboardScript();
    const user = useContext(UserContext);
  return (
    <div className='sidebar'>
        <div className='sidebaritems'>
            <div className='sidebaritem' onClick={(e) => user.setIsSidebar(user.isSidebar=1)}>
                <div className='sidebaritemicon' >
                    <CorporateFareIcon />
                </div>
                <div>
                    <p className='sidebaritemtext'>
                       Primary Details
                    </p>
                </div>
            </div>
            <div className='sidebaritem ' onClick={(e) => user.setIsSidebar(user.isSidebar=2)}>
                <div className='sidebaritemicon analysis' >
                    <QueryStatsIcon />
                </div>
                <div>
                    <p className='sidebaritemtext'>
                       Analytics
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
