import React from 'react';
const SinglePortfolio = (props) => {
    return(
        <div>
        <h1>Thing I've Done</h1>
        <p>This page is for item {props.match.params.id}</p>
        </div>
    )
};

export default SinglePortfolio;