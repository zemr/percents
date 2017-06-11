import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ItemsFilters } from './items-filters';

jest.mock('../pagination/pagination', () => {
  const Pagination = (props) => (<div>{props.children}</div>);
  return Pagination;
});

const data = [
  {"id":1,"name":"It","avatar":"https://","tasks":276,"repairs":33,"efficiency":51},
  {"id":2,"name":"Bitchip","avatar":"https://","tasks":307,"repairs":12,"efficiency":10},
  {"id":3,"name":"Zaam-Dox","avatar":"https://","tasks":416,"repairs":9,"efficiency":100},
  {"id":4,"name":"Wrapsafe","avatar":"https://","tasks":475,"repairs":29,"efficiency":55},
  {"id":5,"name":"Regrant","avatar":"https://","tasks":376,"repairs":8,"efficiency":25},
  {"id":6,"name":"Viva","avatar":"https://","tasks":351,"repairs":30,"efficiency":85},
  {"id":7,"name":"Banity","avatar":"https://","tasks":433,"repairs":8,"efficiency":50},
  {"id":8,"name":"Cardify","avatar":"https://","tasks":336,"repairs":29,"efficiency":48},
  {"id":9,"name":"Latlux","avatar":"https://","tasks":238,"repairs":18,"efficiency":45},
  {"id":10,"name":"Konklab","avatar":"https://","tasks":363,"repairs":28,"efficiency":13},
  {"id":11,"name":"Tampflex","avatar":"https://","tasks":441,"repairs":19,"efficiency":2},
  {"id":12,"name":"Voltsillam","avatar":"https://","tasks":334,"repairs":33,"efficiency":5}
];

describe('items-filters', () => {

  let items;
  beforeEach(() => {
    items = TestUtils.renderIntoDocument(<ItemsFilters data={data} start={0} end={5} />);
  });

  it('filters data', () => {
    const filtered1 = items.filterData(data, {max1: 400, min1: 300, max2: 33, min2: 8, max3: 100, min3: 0});
    expect(filtered1.length).toBe(6);
    const filtered2 = items.filterData(data, {max1: 400, min1: 300, max2: 33, min2: 8, max3: 50, min3: 10});
    expect(filtered2.length).toBe(4);
  });

  it('slices data', () => {
    const sliced = items.sliceData(data, 3, 6);
    expect(sliced.length).toBe(3);
  });

  it('returns starting set when there\'s not enough data to slice', () => {
    const sliced = items.sliceData(data, 15, 20);
    expect(sliced[0].name).toBe('It');
  });

});

describe('items-filters (filters prop)', () => {

  it('returns different data sets depending on existence of filters prop', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ItemsFilters data={data} start={0} end={5} />);
    let result = renderer.getRenderOutput();

    const withoutFilters = JSON.stringify(result).indexOf('"count":12') > 0;
    expect(withoutFilters).toBeTruthy();

    renderer.render(<ItemsFilters data={data} start={0} end={5} filters={{max1: 400, min1: 300, max2: 33, min2: 8, max3: 100, min3: 0}} />);
    result = renderer.getRenderOutput();

    const withFilters = JSON.stringify(result).indexOf('"count":6') > 0;
    expect(withFilters).toBeTruthy();
  });

});
