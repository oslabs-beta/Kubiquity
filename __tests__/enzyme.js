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
      it('should render without errors', () => {
          expect(wrapper.length).toBe(1);
      });
      it('should render with a bar chart', () => { 
        expect(wrapper.find('svg').length).toBe(1);
      }
      );
  });
});





// // Newer Enzyme versions require an adapter to a particular version of React
// configure({ adapter: new Adapter() });
// xdescribe('React unit tests', () => {
//   describe('LabeledText', () => {
//     let wrapper;
//     const props = {
//       label: 'Mega',
//       text: 'Markets',
//     };

//     beforeAll(() => {
//       wrapper = shallow(<LabeledText {...props} />);
//     });

//     it('Renders a <p> tag with the label in bold', () => {
//       expect(wrapper.type()).toEqual('p');
//       expect(wrapper.tkeext()).toEqual('Mega: Marts');
//       expect(wrapper.find('strong').text()).toMatch('Mega');
//     });
//   });

//   describe('MarketDisplay', () => {
//     let wrapper;
//     const props = {
//       index: 10001,
//       location: 'london',
//       cards: 2,
//       percentage: 10,
//       addCard: jest.fn(() => console.log('you added a suck')),
//       deleteCard: jest.fn(() => console.log('u sckd a sck')),
//     };
//     // TODO: Test the following:
//     beforeAll(() => {
//       wrapper = shallow(<MarketDisplay {...props} />);
//     });
//     // 1. A MarketDisplay 1should display all of its text props inside a
//     // LabeledText component
//     it('should display all of its text props inside a LabeledText component', () => {
//       const { index, location, cards, percentage } = props;
//       // expect(index());
//       const arr = [
//         <LabeledText label="Market ID" text={index} />,
//         <LabeledText label="Location" text={location} />,
//         <LabeledText label="Cards" text={cards} />,
//         <LabeledText label="% of total" text={percentage} />,
//       ];
//       expect(wrapper.containsAllMatchingElements(arr)).toEqual(true);
//     });
//     // 2. It should also contain a div with two buttons
//     it('should contain a div with two buttons', () => {
//       const arr = [
//         <div>
//           <button> + </button>
//           <button> - </button>
//         </div>,
//       ];
//       // expect(wrapper.find('.addCard').exists()).toBeTruthy();
//       // expect(wrapper.find('.deleteCard').exists()).toBeTruthy();
//       expect(wrapper.containsAllMatchingElements(arr)).toEqual(true);
//     });
//     // 3. The functions passed down should be invoked on click
//     it('should invoke functions passed down', () => {
//       const { addCard, deleteCard } = props;
//       wrapper.find('button').at(0).simulate('click');
//       expect(addCard).toHaveBeenCalled();
//       wrapper.find('button').at(1).simulate('click');
//       expect(deleteCard).toHaveBeenCalled();
//       // .invoke('onClick')()
//       // .then(() => expect(addCard).toHaveBeenCalled().toEqual(true))
//       // .catch((e) => console.log(e));
//     });
//     // 4. MarketDisplay should render a div with a class of `marketBox`, and the
//     // interior div wrapping the two buttons should have a class of `flex`
//     it('should render a div with a class of marketBox and the interior div wrapping the two buttons should have a class of flex', () => {
//       wrapper = shallow(<MarketDisplay {...props} />);
//       const flexDiv = wrapper.find('.marketBox').shallow().find('.flex');
//       expect(flexDiv.exists()).toBeTruthy();
//       // expect(wrapper.containsAllMatchingElements(arr)).toEqual(true);
//     });
//     // wrapper.find('button').invoke('onClick')().then(() => {
//     //   // expect()
//     // });

//     // wrapper.find('button').at(1);
//   });

//   xdescribe('MarketsDisplay', () => {
//     let wrapper;
//     const props = {
//       totalCards: 10,
//       marketList: [
//         { location: 'london', card: 2 },
//         { location: 'house', card: 1 },
//       ],
//       // percentage: 0.0,
//       addCard: jest.fn(() => console.log('you added a suck')),
//       deleteCard: jest.fn(() => console.log('u sckd a sck')),
//     };
//     // totalCards={props.totalCards}
//     // marketList={props.marketList}
//     // addCard={props.addCard}
//     // deleteCard={props.deleteCard}

//     beforeAll(() => {
//       wrapper = shallow(<MarketsDisplay {...props} />);
//     });
//     // TODO: Test the following:
//     //   1. A MarketsDisplay should have an h4 element to display the 'Markets'
//     //   title
//     it("should have an h4 element to display the 'Markets' title", () => {
//       // const el = <h4>Markets</h4>;
//       expect(wrapper.find('h4').text()).toBe('Markets');
//     });
//     //   2. A single MarketDisplay is rendered for each market in the
//     //   marketList prop
//     it('should render a single MarketDisplay for each market in the marketList prop', () => {
//       const { marketList } = props;
//       expect(wrapper.find('MarketDisplay')).toHaveLength(marketList.length);
//     });
//     //   3. The percentage prop should be a string calculated to two decimals.
//     //   Test for zero, a whole number, and a fractional value. (Right now this
//     //   is implemented incorrectly, so follow TDD here)
//     it('should be a string calculated to two decimals', () => {
//       const { percentage } = wrapper.props;
//       expect(percentage);
//     });
//   });
// });
