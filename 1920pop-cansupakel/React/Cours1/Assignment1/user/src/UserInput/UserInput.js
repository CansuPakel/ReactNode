import React from 'react';

const style ={
    background:'#eee'
};
const userInput = (props) => {
    return ( 
        <div style={style}> 
            <input type="text"  onChange={props.changed} value={props.oldUsername}/>
        </div>
    )

};

export default userInput;
