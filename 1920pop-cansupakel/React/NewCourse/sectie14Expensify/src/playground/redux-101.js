import { createStore} from 'redux';

//action generator

const incrementCount = ({ incrementBy = 1} = {}) =>({
    type:'INCREMENT',
    incrementBy: incrementBy
})

const decrementCount = ({decrementBy = 1} = {} ) => {
    return{
        type: 'DECREMENT',
        decrementBy: decrementBy
    }
}

const resetCount = () =>({
    type: 'RESET',    
})

const setCount = ({set} = {}) =>({
    type: 'SET',
    count: set
})

//Reducers
//1. pure functions: output wordt alleen bepaald door de output
//2. Never change state or action 

const countReducer = ((state = { count: 0}, action)=>{
    switch(action.type){
        case 'INCREMENT':
            return{
                count:state.count + action.incrementBy
            };
         case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            };
         case 'SET':
             return{
                 count: action.count
             }
         case 'RESET':
             return{
                 count: 0
             };
         default:
             return state;
    }
 });
 

const store = createStore(countReducer);

//wordt altijd geroepen als het state veranderd
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());

});


store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy:10}));
store.dispatch(setCount({set:101}));