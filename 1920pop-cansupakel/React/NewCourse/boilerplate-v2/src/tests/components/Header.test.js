import React from 'react';
import {Header} from '../../components/Header';
import {shallow} from 'enzyme'

test('should render Header correctly', () =>{
    const wrapper = shallow(<Header startLogout={()=>{}}/>);
   // expect(toJSON(wrapper)).toMatchSnapshot(); we hebben hiervoor in jest.config.json een serializer gezet dus toJSON() mag weg
   expect(wrapper).toMatchSnapshot();
})



test('should  call startlogout button', ()=>{
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>)
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})
