import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person.js';

//react hooks can use here.
//functional component and can have other functions like SwitchName
//The most hook is the useState
//UseState state it array always 2 elements
const app =(props) => {
  const [personsState, setPersonsState ] = useState( {
    persons : [
      { name:'Cansu', age:21 },
      { name : 'Test', age:23 },
    ],
  });

  const [otherState, setOtherState]= useState({otherState: 'OtherState'})

  console.log(personsState, otherState);

  
  const switchName = (newName) => {
    //not this.setstate maar setPersonState
    setPersonsState({
      persons : [
        { name:'Cansu', age:21 },
        { name : newName, age:30 },
      ],  
    })
  };


  
    return (
      <div className="App">
        <h1>Hi, I'am a React App</h1>
        
        {/* by hook is it not this.switchName but only switchname 
        
        bind(this) = list of arguments changes name (passing arg)*/}


        {/* arrow func return after => returnd een function call switchname() will be excuted after click 
        beter een bind gebruiken*/}
        
        <button onClick={()=> switchName('Testtt') }>Verander naam</button>
        <Person 
          name={personsState.persons[0].name} 
          age={personsState.persons[0].age}>Test childeren</Person>
        <Person 
        name={personsState.persons[1].name}
         age={personsState.persons[1].age}
         click={switchName.bind(this,'TestParagraf')}>Test childeren</Person>

      </div>
    );
}
export default app;

