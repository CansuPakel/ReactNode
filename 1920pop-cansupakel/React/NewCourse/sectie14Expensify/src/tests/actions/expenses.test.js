import { startAddExpense, editExpense, removeExpense, setExpenses, startSetExpenses , startRemoveExpense ,startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; //middleware
import database from '../../firebase/firebase';
import expensesReducer from '../../reducers/expenses';

const uid = 'thisistestuid';
const defaultAuthState={auth:{ uid }};
const createMockStore  = configureMockStore([thunk])

beforeEach((done)=>{
  const expensesData= {};
  expenses.forEach(({id,description,amount,createdAt,note})=>{
    expensesData[id] = {description,note, amount,createdAt};
  })
  database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>{
  }).catch(done())
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});



//async test
test('should add expense to database and store',(done)=>{
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description:'mouse',
    amount:3000,
    note:'This one',
    createdAt:10000
  }

  store.dispatch(startAddExpense(expenseData)).then(()=>{
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type:'ADD_EXPENSE',
        expense:{
          id:expect.any(String),
          ...expenseData
        }
      });
      return database.ref(`user/${uid}/expenses/${actions[0].expense.id}`).once('value');

  }).then((snapchot)=>{
      expect(snapchot.val()).toEqual(expenseData);
      //hij doet de done() hier.
  }).catch(done())
});

test('should add expense with default to database and store',(done)=>{
  const store = createMockStore(defaultAuthState);
  const expenseDefault = {
    description:'',
    amount:0,
    note:'',
    createdAt:0
  }

  store.dispatch(startAddExpense({})).then(()=>{
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type:'ADD_EXPENSE',
        expense:{
          id:expect.any(String),
          ...expenseDefault
        }
      });
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');

  }).then((snapchot)=>{
      expect(snapchot.val()).toEqual(expenseDefault);
  }).catch(done())
});


test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type:'SET_EXPENSES',
    expenses
  });
});



test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_EXPENSES',
      expenses
    });
  }).catch(done())
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapchot)=>{
    expect(snapchot.val()).toBeFalsy();
  }).catch(done());
});


test('should edit expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id
  const updates = { amount: 2435};
  store.dispatch(startEditExpense(id,updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapchot)=>{
    expect(snapchot.val().amount).toBe(updates.amount);
  }).catch(done());
});