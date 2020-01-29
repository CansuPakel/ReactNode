import React from 'react';
//import ExpenseList from '
//import ExpenseListFilters from './ExpenseListFilters'
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage';

test('should render dashboard page', () =>{
    const wrapper = shallow(<DashboardPage/>);
    expect(wrapper).toMatchSnapshot();
})