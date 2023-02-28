import React from 'react';
import dashboardimg from './assets/dashboard.png';


export const SubNavbar = () => {
  return (
    <div className='subnavbar'>
        <div className='heading'>
            <div>
                <img className='headingicon' src={dashboardimg} alt='dashboard' />
            </div>
            <div >
                <h5 className='title1'>DASHBOARD</h5>
            </div>
        </div>
    </div>
  )
}
