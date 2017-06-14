import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import sinon from 'sinon';
import ConnectedApp, { App, tasks, repairs, efficiency } from './app';

jest.mock('./data/items.json', () => {
  return [
    {"id":1,"name":"It","avatar":"https://","tasks":276,"repairs":33,"efficiency":51},
    {"id":2,"name":"Bitchip","avatar":"https://","tasks":307,"repairs":12,"efficiency":10},
    {"id":3,"name":"Zaam-Dox","avatar":"https://","tasks":416,"repairs":9,"efficiency":100},
    {"id":4,"name":"Wrapsafe","avatar":"https://","tasks":475,"repairs":29,"efficiency":55},
    {"id":5,"name":"Regrant","avatar":"https://","tasks":376,"repairs":8,"efficiency":25},
    {"id":6,"name":"Viva","avatar":"https://","tasks":351,"repairs":30,"efficiency":85}
   ]
});

describe('app', () => {

  it('renders without crashing', () => {
    const store = createStore(() => {});
    sinon.stub(store, 'getState').returns({
      pagination: {
        start: 0,
        end: 5
      }
    });
    sinon.stub(document, 'getElementById').returns({
      getBoundingClientRect: () => {
        return {left: 10}
      }
    });

    TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedApp  />
      </Provider>
    );

    store.getState.restore();
    document.getElementById.restore();
  });

  it('prepares data for sliders', () => {
    tasks.splice(0,6);
    repairs.splice(0,6);
    efficiency.splice(0,6);

    const renderer = new ShallowRenderer();
    renderer.render(<App page={{ start: 0, end: 5 }} />);

    expect(tasks.length).toBe(6);
    expect(repairs.length).toBe(6);
    expect(efficiency.length).toBe(6);
  });

  it('sets proper values for sliders', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App page={{ start: 0, end: 5 }} />);
    const result = renderer.getRenderOutput();

    const slider1 = JSON.stringify(result).indexOf('"maxValue":475');
    const slider2 = JSON.stringify(result).indexOf('"maxValue":33');
    const slider3 = JSON.stringify(result).indexOf('"maxValue":100');
    const max1 = slider1 > 0;
    const max2 = slider2 > 0;
    const max3 = slider3 > 0;
    const min1 = JSON.stringify(result).indexOf('"minValue":276') > 0;
    const min2 = JSON.stringify(result).indexOf('"minValue":8') > 0;
    const min3 = JSON.stringify(result).indexOf('"minValue":10') > 0;
    expect(max1).toBeTruthy();
    expect(max2).toBeTruthy();
    expect(max3).toBeTruthy();
    expect(min1).toBeTruthy();
    expect(min2).toBeTruthy();
    expect(min3).toBeTruthy();

    expect.extend({
      toExistBefore(received, argument) {
        const pass = (received < argument);
        if (pass) {
          return {
            message: () => (`expected ${received} to be greater then ${argument}`),
            pass: true
          };
        } else {
          return {
            message: () => (`expected ${received} to be smaller then ${argument}`),
            pass: false
          };
        }
      }
    });

    expect(slider1).toExistBefore(slider2);
    expect(slider2).toExistBefore(slider3);
  });

});
