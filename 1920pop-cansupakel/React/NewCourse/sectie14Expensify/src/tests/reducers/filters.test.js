import filtersReducer from '../../reducers/filters';
import moment from 'moment';
test('should setup default filter value', () => {
    const  state = filtersReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual({
        text:'',
        sortBy:'date',
        startDate: undefined,
        endDate: undefined
    })
})

test('should setup sortby amount',()=>{
    const state = filtersReducer(undefined,{type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
})

test('should setup sortby date', () => {
    const currentState= {
        text:'',
        startDate:undefined,
        endDate:undefined,
        sortBy:'amount'
    } //we doen dtit omdat date default is en we wllen zeker weten dat het werkt
    const state = filtersReducer(currentState,{ type:'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
})

test('should set text filter', ()=>{
    const state = filtersReducer(undefined,{type: 'SET_FILTER', text:'Gum'});
    expect(state.text).toBe('Gum');
})

test('should set startDate',()=>{
    const startDate = moment();
    const action = {
        type:'SET_START_DATE',
        date: moment()
    }
    const state = filtersReducer(undefined,action);
    expect(state.startDate).toEqual(startDate);
})

test('should set endDate',()=>{
    const endDate = moment();
    const action = {
        type:'SET_END_DATE',
        date: moment()
    }
    const state = filtersReducer(undefined,action);
    expect(state.endDate).toEqual(endDate);
})