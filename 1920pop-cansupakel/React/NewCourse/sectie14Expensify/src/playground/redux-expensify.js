import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

const addExpense = ({ description = '', note= '', amount=0, createdAt=0} = {}) => ({
    type:'ADD_EXPENSE',
    expense:{  //let op gebruik geen expenses!!
        id:uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

const removeExpense = ({ id } = {}) => ({
    type:'REMOVE_EXPENSE',
    id
})

const editExpense = (id,updates) =>({
    type:'EDIT_EXPENSE',
    id,
    updates
});


//Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state, 
                action.expense //new object
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => {
                return id !== action.id;
            });
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id === action.id){
                    return{
                        ...expense,
                        ...action.updates
                    }//return neemt eerst alle bestaande eigenschappen en dan met action.updates gaat men ze
                }else{
                    return expense
                }
            })
        default:
            return state;
    }
}


const setTextFilter = (text= '') =>({
    type:'SET_FILTER',
    text
});

const sortByAmount = () =>({
    type:'SORT_BY_AMOUNT'
});


const sortByDate= () =>({
    type:'SORT_BY_DATE'
});

const setStartDate = (date = 'undefined') =>({
    type:'SET_START_DATE',
    date,
});

const setEndDate = (date = 'undefined') =>({
    type:'SET_END_DATE',
    date,
});
//Filters reducer
const filtersReducerDefaultState = {text: '', sortBy:'date', startDate: 'undefinded', endDate:'undefinded'};
const filtersReducer = (state = filtersReducerDefaultState, action) =>{
    switch(action.type){
        case 'SET_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                'sortBy':'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                'sortBy':'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
         case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }    
        default:
            return state;
    }
}

//get visibile expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate})=>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch  = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch= expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1  : -1; //recent
        }else if(sortBy ==='amount'){
            return a.amount < b.amount ? 1 : -1; //duurste eerst
        }
    });
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters:filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    const visibileExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibileExpenses);
});

const expenseOne= store.dispatch(addExpense({description:'Rent', amount:100, createdAt:-1000}));
const expenseTwo = store.dispatch(addExpense({description:'Coffee', amount:300, createdAt:1000}));
//store.dispatch(removeExpense({id: expenseOne.expense.id}));
//store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

//store.dispatch(setTextFilter('rent'));
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
//store.dispatch(setStartDate(-2000)); //125 zal enkel rent tonen en -2000 zal beide tonen
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(1230));


