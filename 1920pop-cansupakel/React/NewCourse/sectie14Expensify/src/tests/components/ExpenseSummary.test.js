import React from 'react';
import {shallow} from 'enzyme';
import {  ExpenseSummary }  from '../../components/ExpenseSummary';

test('should render with 1 expense',()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={230}/>)
    expect(wrapper).toMatchSnapshot();
})

test('should render with more expense',()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount={23} expensesTotal={2435665}/>)
    expect(wrapper).toMatchSnapshot();
})