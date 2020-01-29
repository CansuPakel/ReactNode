import React from 'react';
import AddOption from './AddOption.js'
import Header from './Header.js';
import Action from './Action.js';
import Options from './Options.js';

class IndecisionApp extends React.Component{
    state = {
      options: this.props.options
    }
   
    handleDeleteOptions = () =>{
     /**  this.setState(()=>{
        return{
          options:[]
        }
      });*/
      this.setState(() => ({ options:[] }))
    }
  
    handelDeleteOption = (optionToRemove)=>{
      this.setState((prevState) => ({ 
        options: prevState.options.filter((option) => {
          return optionToRemove !== option;
        })
      }))
    }
  
    handleAction= ()=>{
      let random = this.state.options[Math.floor(Math.random()*this.state.options.length)];
      alert(random);
    }
  
    handleAddOption =(option)=>{
      if(!option){
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1){ //check match
        return 'This option already exists';
      }
  
      this.setState((prevState) => ({ options:  prevState.options.concat([option]) }))
    }

    componentDidMount(){
      try{
        const json =localStorage.getItem('options');
        const options = JSON.parse(json);
       if(options){
        this.setState(()=>({options:options}));
       }
      }catch(e){
        console.log('error');
      }
    }
  
    componentDidUpdate(prevProps, prevState){
  
      //wanneer de vorige state niet het zelfde is als de huidige state
      if(prevState.options.length !== this.state.options.length){
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
        console.log("saving data");
      }
    }
  
    componentWillUnmount(){
      console.log("Will unmount")
    }
  
    render(){
    //  const title = 'Indecision prop';
      const subtitle = 'Put your life';
      return(
        <div>
          <Header/>
          <Action handleAction={this.handleAction} hasOptions={this.state.options.length > 0}/>
          <Options 
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions} //button is in options
            handelDeleteOption={this.handelDeleteOption}
          />
          <AddOption handleAddOption={this.handleAddOption}/>
        </div>
      );
    };
  }
  
  IndecisionApp.defaultProps = {
    options:[]
  }

  export default IndecisionApp;