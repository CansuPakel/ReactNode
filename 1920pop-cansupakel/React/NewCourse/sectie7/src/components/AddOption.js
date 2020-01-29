import React from 'react';

class AddOption extends React.Component{
    state = {
      error:''
    };
    AddOption = (e) =>{
      e.preventDefault();
      const option =e.target.elements.option.value.trim();      
      const error = this.props.handleAddOption(option);
  
      this.setState(()=> ({ error:error}))
  
      if(!error){
        e.target.elements.option.value ='';
      }
    }; 
  
    render(){
    
      return(
        <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.AddOption}>
          <input className="add-option__input" type="text" name="option"/>
          <button className="button">Add option</button>
        </form>
        </div>
      )
    }
  }

  export default AddOption;