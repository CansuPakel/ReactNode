import uuid from 'uuid';
import database from '../firebase/firebase'

export const addExpense = (expense) => ({
    type:'ADD_EXPENSE',
    expense
})

//werkt pas na het opzetten van middleware (redux-thunk)
export const startAddExpense = (expenseData = {} ) =>{
    return (dispatch, getState) =>{
        const uid= getState().auth.uid;
        const {
            description = '', 
            note= '', 
            amount=0, 
            createdAt=0
        } = expenseData

        const expense = { description, note,amount,createdAt}
    return  database.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{
            dispatch(addExpense({
                //.then geeft een ref terug en firebase maakt een eigen id. de rest gewoon zelfde
                id: ref.key,
                ...expense
            }));
        })
    }
}

export const startRemoveExpense = ({id}= {}) =>{
    return (dispatch, getState)=>{
        const uid= getState().auth.uid;
        return   database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}))
        })
    }
}

export const removeExpense = ({ id } = {}) => ({
    type:'REMOVE_EXPENSE',
    id
})

export const startEditExpense = (id,updates) =>{
    return (dispatch, getState) => {
        const uid= getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(()=>{
            dispatch(editExpense(id,updates));
        })
    }
}

export const editExpense = (id,updates) =>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

export const setExpenses = (expenses)=>({
    type:'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () =>{
    return (dispatch,getState) =>{
        const uid= getState().auth.uid;
        return    database.ref(`users/${uid}/expenses`).once('value').then((snapchot) =>{
                const expenses = [];
                snapchot.forEach((childSnapchot)=> {
                    expenses.push({
                        id: childSnapchot.key,
                        ...childSnapchot.val()
                    });
                });
                dispatch(setExpenses(expenses))
        })
    }
}
