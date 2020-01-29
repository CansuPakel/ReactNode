 import React from 'react';
 //geen this gebruiken en het renderd vanzelf dus geen render()
 const Action = (props) => {
    return (
      <div>
        <button
         disabled={!props.hasOptions} 
         onClick={props.handleAction}>
         What should I do?
         </button>
      </div>
    )
  }
  
  /**class Action extends React.Component {
    render(){
      return (
        <div>
          <button
           disabled={!this.props.hasOptions} 
           onClick={this.props.handleAction}>
           What should I do?
           </button>
        </div>
      )
    }
  }*/

  export default Action;