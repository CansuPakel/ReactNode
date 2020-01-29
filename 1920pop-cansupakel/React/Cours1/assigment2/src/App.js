import React, {Component} from 'react';
import './App.css';
import Validation from './Validation/Validation'
import Char from './Char/Char'


class App extends Component{
    state={
      inputfield:''
    };

    changeInput = (event) =>{
      this.setState({inputfield: event.target.value})
    }

    deleteChar = (index) => {
      const inputfield = this.state.inputfield;
      const text = this.state.inputfield.split(''); //array character
      text.splice(index,1);
      const updated = text.join(''); //again in string
      this.setState({inputfield: updated});
    }

    render () {
      const chars = this.state.inputfield.split('').map((char, index)=>{
        return    <Char
                  character= {char}
                  key = {index}
                  clicked={() => this.deleteChar(index)}/>;
      });
      
      return (
        <div>
          <input type="text" onChange={this.changeInput} value={this.state.inputfield} />
          {this.state.inputfield}
          <Validation inputfield={this.state.inputfield}/>
          {chars}
        </div>
      );
    }
}


export default App;
