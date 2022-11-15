import React from 'react'

export  const UserList = (props) => {
  return (
    <div className='userList' >
        <tr>
          <td>{props.srl_no+1}</td>
          <td>{props.account}</td>
        </tr>
    </div>
  );
}
