/**
 * @jest-environment jsdom
 */


import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.
import NavBar from '../src/components/navBar';
import BarChart from '../src/components/barChart';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
    let wrapper;
    describe('NavBar component', () => {
        it('should render without errors', () => {
            const wrapper = shallow(<NavBar />);
            expect(wrapper.length).toBe(1);
        });
    });
    describe('BarChart component', () => {
        let wrapper;
        const props = {
            data: [],
            categories: [],
        }
        beforeAll(() => {
            wrapper = shallow(<BarChart {...props} />);
        });

        it('should render without errors', () => {
            expect(wrapper.length).toBe(1);
        });
        it('should pass props to the <BarChart /> component', () => {
            console.log(wrapper.find(BarChart).prop(), "console.log");
            expect(wrapper.find('BarChart').prop()).toEqual(props);
        });
    });
});