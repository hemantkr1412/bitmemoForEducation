import React from 'react';
import "./Popup.css";



export const Popup = (props) => {

  return (props.trigger  ? 
    <div className='popup'>
        <div className='popup-inner'>
            <button className='btn' onClick={() => props.setTrigger(false)}>X</button>
            {props.children}
        </div>
    </div>
    
    : ""
    
    );
}
