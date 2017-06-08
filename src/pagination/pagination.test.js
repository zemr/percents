import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import Pagination from './pagination';

describe('pagination', () => {

  const store = createStore(() => {});
  sinon.stub(store, 'getState').returns({
    pagination: {
      start: 0,
      end: 5
    }
  });

  afterAll(() => {
    store.getState.restore();
  });

  it('renders pagination', () => {
    const pagination = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Pagination count={10} perPage={5} />
      </Provider>
    );
    const main = TestUtils.findRenderedDOMComponentWithClass(pagination, 'pages');
    expect(main).toBeDefined();
    const pages = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page');
    expect(pages.length).toEqual(2);
  });

  it('renders correct number of pages', () => {
    const pagination = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Pagination count={11} perPage={3} />
      </Provider>
    );
    const pages = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page');
    expect(pages.length).toEqual(4);
  });

  it('doesn\'t render page link when there is only one page', () => {
    const paginationSM = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Pagination count={3} perPage={5} />
      </Provider>
    );
    const pagesSM = TestUtils.scryRenderedDOMComponentsWithClass(paginationSM, 'page');
    expect(pagesSM.length).toEqual(0);

    const paginationEQ = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Pagination count={5} perPage={5} />
      </Provider>
    );
    const pagesEQ = TestUtils.scryRenderedDOMComponentsWithClass(paginationEQ, 'page');
    expect(pagesEQ.length).toEqual(0);
  });

});
