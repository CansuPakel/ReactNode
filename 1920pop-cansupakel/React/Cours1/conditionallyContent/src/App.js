import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
 state ={
    persons : [
      { id: 1, name:'Cansu', age:21 },
      { id:2, name : 'Test', age:23 },
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
      )
    }
     return (
      <div className="App">
        <h1>Hi, I'am a React App</h1>      
        <button onClick={this.togglePerson}>Show persons</button>
        {persons}

      </div>
     )};
}
export default App;

