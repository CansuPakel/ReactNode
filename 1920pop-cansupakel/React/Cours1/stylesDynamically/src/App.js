import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';
import Radium , {StyleRoot} from 'radium';

class App extends Component {
 state ={
    persons : [
      { id: 1, name:'Cansu', age:21 },
      { id:2, name : 'Test', age:23 },
      { id:3, name : 'Test2', age:25 },

    ],
  otherState: 'otherstate',
  showPersons: false
  }

  togglePerson = (event) =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  deletePerson =(index)=>{
   // const persons = this.state.persons.slice(); //copy full array
    const persons = [...this.state.persons]
    persons.splice(index,1);  //verwijderd 1 person
    this.setState({persons:persons});
  }

  changeName = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex] //al the properties in a new object person
    };
    // OR this     const person = Object.assign({},this.state.person[personIndex])

    person.name = event.target.value

    const persons = [...this.state.persons]; //copy 
    persons[personIndex] = person; //update one element
    this.setState({persons: persons}) //set it
  }
  
  render(){

    const style = {
      backgroundColor:'green',
      color:'white',
      font:'inherit',
      border:'0.1rem solid blue',
      padding:'0.8rem',
      cursor:'pointer',
      ':hover':{
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons =null;

    if(this.state.showPersons){
      persons = (

        <div>
          {this.state.persons.map((p, index) =>{
            return <Person 
                    click= {() => this.deletePerson(index)}
                    name={p.name}
                    age = {p.age}
                    key = {p.id}
                    changed={(event) => this.changeName(event,p.id)} //function to pass the data
            />
          })}
        </div> 
      );

      style.backgroundColor= 'grey';
      style[':hover'] = {
        backgroundColor: 'lightgrey',
        color:'black'
      }
    }


    const classes = [];
    if(this.state.persons.length <=2){
      classes.push('red');
    }

    if(this.state.persons.length <=1){
      classes.push('bold');
    }


    //styleroot; media gebruikt in person moet je hier styleroot gebruiken
     return (
       <StyleRoot> 
          <div className="App">
            <h1>Hi, I'am a React App</h1>   
            <p className={classes.join(' ')}>Its work</p>   
            <button style={style} onClick={this.togglePerson}>Show persons</button>
            {persons}

          </div>
      </StyleRoot>
     )};

}
export default Radium(App);

