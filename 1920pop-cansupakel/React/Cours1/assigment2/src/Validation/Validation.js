import React from 'react';


const validation = (props) => {
    
    return ( 
       <div>
           {
               props.inputfield.length > 5 ?
                <p>Text is long enough</p> :
                <p>Text is too short</p>
            }
       </div>
    );
};
export default validation;
