import React from 'react';
import Option from './Option.js';

  const Options = (props) =>{
    return(
      <div>
      <button onClick={props.handleDeleteOptions}>Remove all</button>
      {props.options.length === 0 && <p>Please add an option</p>}
  
        {
          props.options.map((option) =>
            <Option key={option} name={option} handelDeleteOption={props.handelDeleteOption}/>
          )
        }
      </div>
  )
  }

export default Options;