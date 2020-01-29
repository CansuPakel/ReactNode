import React from 'react';
 const Option = (props) =>{
    return(
      <div>
        Option: {props.name}
        <button onClick={(e) => {
            props.handelDeleteOption(props.name)
        }} >
          Remove
          </button>
      </div>
    )
  }
  
  export default Option;