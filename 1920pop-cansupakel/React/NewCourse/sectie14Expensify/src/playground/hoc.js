//higher order component (HOC) - Component renders ander component
//reuse code
//render hijacking
//prop manipulation
//abstract state
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>The info</h1>
        <p>The info is {props.info}</p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) =>(
        <div>
            {props.isAdmin && <p>This is private info, please don't share</p>}
            <WrappedComponent {...props}/>
        </div>
    )
};

const requireAuthentication = (WrappedComponent) =>{
    return (props) =>(
        <div>
            {props.IsAuthenticated ?  <WrappedComponent {...props}/> : <p>Please login to view the info</p>}
            
        </div>
    )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AuthInfo IsAuthenticated={true} />, document.getElementById('app'))



