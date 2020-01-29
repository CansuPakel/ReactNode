import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export const LoginPage = ({startLogin}) => {
        return(
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Login page React-POP</h1>
                    <p>expenses</p>
                    <button  className="button" onClick={startLogin}>Login met Google</button>
                </div>
            </div>
        )
}

const mapDispatchToProps = (dispatch) =>({
    startLogin: () => dispatch(startLogin())
})
export default connect(undefined,mapDispatchToProps)(LoginPage);