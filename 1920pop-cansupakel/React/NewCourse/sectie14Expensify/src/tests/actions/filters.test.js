import { setEndDate, setStartDate, setTextFilter,sortByDate,sortByAmount} from '../../actions/filters';
import moment from 'moment';
test('should generate set start date',()=>{
    const start = setStartDate(moment(0));
    expect(start).toEqual({
        type:'SET_START_DATE',
        date: moment(0)
    })
})

test('should generate set end date',()=>{
    const end = setEndDate(moment(0));
    expect(end).toEqual({
        type:'SET_END_DATE',
        date:moment(0)
    })
})

test('should generate set start date default',()=>{
    const date = setStartDate();
    expect(date).toEqual({
        type:'SET_START_DATE',
        'date':'undefined'
    })
})

test('should generate set end date default',()=>{
    const date = setEndDate();
    expect(date).toEqual({
        type:'SET_END_DATE',
        'date':'undefined'
    })
})

test('should generate filter', () =>{
    const filter= setTextFilter('bill');
    expect(filter).toEqual({
        type:'SET_FILTER',
        'text': 'bill'
    });
});

test('should generate filter default', () =>{
    const filter = setTextFilter();
    expect(filter).toEqual({
        type:'SET_FILTER',
        'text':''
    })
})

test('should sort by date',() =>{
    const sort =  sortByDate();
    expect(sort).toEqual({
        type:'SORT_BY_DATE'
    })
})

test('should sort by amount',()=>{
    const sort = sortByAmount();
    expect(sort).toEqual({
        type:'SORT_BY_AMOUNT'
    })
})