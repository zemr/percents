import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import App from './app';

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
        <App />
      </Provider>
    );

    store.getState.restore();
    document.getElementById.restore();
  });

});
