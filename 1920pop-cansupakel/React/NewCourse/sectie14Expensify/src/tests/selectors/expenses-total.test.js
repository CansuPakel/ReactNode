import selectExpenseTotal from '../../selectors/Expenses-total'
import expenses from '../fixtures/expenses'
import {shallow} from 'enzyme';

test('should return 0 if no expenses', () =>{
    const rest = selectExpenseTotal([]);
    expect(rest).toBe(0);
})


test('should add up a single expense', () =>{
    const result = selectExpenseTotal([expenses[0]]); //moet in array omdat we rond map gaan
    expect(result).toBe(195)
})

test('should add up a single expense', () =>{
    const result = selectExpenseTotal(expenses);
    expect(result).toBe(34695)
})