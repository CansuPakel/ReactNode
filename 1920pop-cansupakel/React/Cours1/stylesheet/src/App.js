import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person.js';

const app =(props) => {
  const [personsState, setPersonsState ] = useState( {
    persons : [
      { name:'Cansu', age:21 },
      { name : 'Test', age:23 },
    ],
  });

  const [otherState, setOtherState]= useState({otherState: 'OtherState'})

  console.log(personsState, otherState);

  const changeName = (event) => {
    setPersonsState({
      persons : [
        { name:'Cansu', age:21 },
        { name : event.target.value, age:30 },
      ],  
    })
  }
  
    return (
      <div className="App">
        <h1>Hi, I'am a React App</h1> 
        <Person 
          name={personsState.persons[0].name} 
          age={personsState.persons[0].age}>Test childeren</Person>
        <Person 
        name={personsState.persons[1].name}
         age={personsState.persons[1].age}
         changed={changeName}>Test childeren</Person>
      </div>
    );
}
export default app;

