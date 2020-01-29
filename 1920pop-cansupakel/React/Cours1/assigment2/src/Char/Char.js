import React from 'react';


const char = (props) => {
   const style = {
       display: "inline-block",
       padding:"1.6rem",
       textAlign:"center",
       margin:"1.6rem",
       border:"1px solid black"
   };
    return ( 
       <div style={style} onClick={props.clicked}>
           {props.character}
       </div>
    );
};
export default char;