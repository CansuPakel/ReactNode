import React from 'react';
import Option from './Option.js';

  const Options = (props) =>{
    return(
      <div>
        <div className="widget-header">
          <h3 className="widget-header__title">Your options</h3>
          <button className="button button--link" onClick={props.handleDeleteOptions}>Remove all</button>
        </div>
      {props.options.length === 0 && <p className="widget__message">Please add an option</p>}
  
        {
          props.options.map((option, index) =>
            <Option key={option} name={option} count={index+1} handelDeleteOption={props.handelDeleteOption}/>
          )
        }
      </div>
  )
  }

export default Options;