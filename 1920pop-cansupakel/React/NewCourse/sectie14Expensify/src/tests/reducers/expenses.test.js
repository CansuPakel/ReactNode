import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses';

test('should set default expenses',()=>{
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([])
});


test('should remove expense by id',() =>{
    const action = {
        type:'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});

test('should NOT remove expense if  id not FOUND',() =>{
    const action = {
        type:'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});



test('should add expense',() =>{
    const expense = {
        id:'4',
        description:'Chips',
        note:'',
        amount:200,
        createdAt:0
    }
    const action = {
        type:'ADD_EXPENSE',
        expense
        
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([...expenses,expense]);
});


test('should edit expense', () => {
    const amount = 122000
    const action = {
        type:'EDIT_EXPENSE',
        id: expenses[1].id,
        updates:{
            amount
        }
    }
    const state = expensesReducer(expenses,action);
    expect(state[1].amount).toBe(amount);
})



test('should not edit expense if id not found', () => {
    const amount = 122000
    const action = {
        type:'EDIT_EXPENSE',
        id: '-1',
        updates:{
            amount
        }
    }
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
})



test('should setup set expense', () => {
    const action = {
        type:'SET_EXPENSES',
        expenses:[expenses[0]]
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0]]);
});