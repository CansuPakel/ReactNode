import React from 'react';


//function 
const person = (props) => {
    //return <p>I'm a person and I am {Math.floor(Math.random()*30)} years old!</p>
    return ( 
        <div>
            <p>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
        </div>
    )

};

export default person;


