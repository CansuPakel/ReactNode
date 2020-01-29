import React from 'react';
import classes from './Person.css'
//function 
const person = (props) => {
 
    return ( 
        <div className={classes.Person} >
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.childeren}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
            
        </div>
    )

};

export default person;


