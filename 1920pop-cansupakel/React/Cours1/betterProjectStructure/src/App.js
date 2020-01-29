import React, { Component } from 'react';
import classesAsProp from './App.css';
import Person from './Person/Person.js';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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

    person.name = event.target.value

    const persons = [...this.state.persons]; //copy 
    persons[personIndex] = person; //update one element
    this.setState({persons: persons}) //set it
  }
  
  render(){

    let persons =null;

    let btnClass = '';

    if(this.state.showPersons){
      persons = (

        <div>
          {this.state.persons.map((p, index) =>{
            return <ErrorBoundary key = {p.id}>
                        <Person 
                              click= {() => this.deletePerson(index)}
                              name={p.name}
                              age = {p.age}
                              changed={(event) => this.changeName(event,p.id)} //function to pass the data
                        />
                    </ErrorBoundary>
          })}
        </div> 
      );
      btnClass= classesAsProp.Red

    }



    const classes = [];
    if(this.state.persons.length <=2){
      classes.push(classesAsProp.red);
    }

    if(this.state.persons.length <=1){
      classes.push(classesAsProp.bold);
    }


     return (
          <div className={classesAsProp.App}>
            <h1>Hi, I'am a React App</h1>   
            <p className={classes.join(' ')}>Its work</p>   
            <button className={btnClass} onClick={this.togglePerson}>Show persons</button>
            {persons}

          </div>
     )};

}
export default App;

