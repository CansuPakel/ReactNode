import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
      expenseCount: visibleExpenses.length,
      expensesTotal: selectExpensesTotal(visibleExpenses)
    };
  };

export const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses' ;
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
    return (
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord}: <span>{formattedExpensesTotal}</span></h1>
          <div className="page-header__actions">
            <Link className="button" to='/create'>Add expense</Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default connect(mapStateToProps)(ExpenseSummary);
  