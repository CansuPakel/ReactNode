import React from 'react';
//import ExpenseList from '
//import ExpenseListFilters from './ExpenseListFilters'
import { shallow } from 'enzyme';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('should render expensedashboard page', () =>{
    const wrapper = shallow(<ExpenseDashboardPage/>);
    expect(wrapper).toMatchSnapshot();
})