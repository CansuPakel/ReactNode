import React from 'react';
import './UserOutput.css'
const userOutput = (props) => {
    return ( 
        <div className='User'> 
            <p>Het is laat in de avond</p>
            <p>{props.username}</p>
        </div>
    )

};

export default userOutput;
