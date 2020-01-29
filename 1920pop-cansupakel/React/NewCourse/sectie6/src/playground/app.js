class IndecisionApp extends React.Component{
  constructor(props){
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handelDeleteOption = this.handelDeleteOption.bind(this);
    this.state={
      options:props.options
    }
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
  handleDeleteOptions(){
   /**  this.setState(()=>{
      return{
        options:[]
      }
    });*/
    this.setState(() => ({ options:[] }))

  }

  handelDeleteOption(optionToRemove){
    this.setState((prevState) => ({ 
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }))
  }

  handleAction(){
    let random = this.state.options[Math.floor(Math.random()*this.state.options.length)];
    alert(random);
  }

  handleAddOption(option){
    if(!option){
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1){ //check match
      return 'This option already exists';
    }

    this.setState((prevState) => ({ options:  prevState.options.concat([option]) }))
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


const Header = (props) =>{
  return(
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  )
}

Header.defaultProps = {
  title: 'some default'
}


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


class AddOption extends React.Component{
  constructor(props){
    super(props);
    this.AddOption = this.AddOption.bind(this);
    this.state = {
      error:''
    };
  }

  AddOption(e){
    e.preventDefault();
    const option =e.target.elements.option.value.trim();      
    const error = this.props.handleAddOption(option);

    this.setState(()=> ({ error:error}))

    if(!error){
      e.target.elements.option.value ='';
    }
  } 

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


//functional component , faster dan component omdat het niet moet overerve
/**const User = (props) => {
  return (
    <div>
      <p>Name: {props.name} </p>
      <p>Age: {props.age}</p>
    </div>
  )
};

ReactDOM.render(<User name='Cansu' age={32} />,document.getElementById('app'));*/


ReactDOM.render(<IndecisionApp/>,document.getElementById('app'));