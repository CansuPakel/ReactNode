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
        <h1>Addoption</h1>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.AddOption}>
          <input type="text" name="option"/>
          <button>Add option</button>
        </form>
        </div>
      )
    }
  }

  export default AddOption;