import React from 'react';


//function 
const person = (props) => {
    return ( 
        <div>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <input type="text" onChange={props.changed} value={props.name}/>
            
        </div>
    )

};

export default person;


