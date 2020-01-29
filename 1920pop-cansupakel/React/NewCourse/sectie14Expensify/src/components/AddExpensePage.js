import React from 'react';
import ExpenseForm from './ExpenseForm'
import {connect} from 'react-redux';
import {startAddExpense} from '../actions/expenses'

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense)
        this.props.history.push('/'); //gaat naar dashboard na een het toevoegen
    };

    render(){
        return (
            <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Voeg een expense toe</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm
                onSubmit={this.onSubmit}
                />
            </div>
        </div>
        )
    }
}

//dit is gemakkelijker om te testen
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});


export default connect(undefined, mapDispatchToProps)(AddExpensePage);