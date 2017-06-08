import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Pagination } from './pagination';

describe('pagination', () => {

  it('renders pagination', () => {
    const pagination = TestUtils.renderIntoDocument(
        <Pagination count={10} perPage={5} setPagination={() => {}} />
    );
    const main = TestUtils.findRenderedDOMComponentWithClass(pagination, 'pages');
    expect(main).toBeDefined();
    const pages = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page');
    expect(pages.length).toEqual(2);
  });

  it('renders correct number of pages', () => {
    const pagination = TestUtils.renderIntoDocument(
        <Pagination count={11} perPage={3} setPagination={() => {}} />
    );
    const pages = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page');
    expect(pages.length).toEqual(4);
  });

  it('doesn\'t render page link when there is only one page', () => {
    const paginationSM = TestUtils.renderIntoDocument(
        <Pagination count={3} perPage={5} setPagination={() => {}} />
    );
    const pagesSM = TestUtils.scryRenderedDOMComponentsWithClass(paginationSM, 'page');
    expect(pagesSM.length).toEqual(0);

    const paginationEQ = TestUtils.renderIntoDocument(
        <Pagination count={5} perPage={5} setPagination={() => {}} />
    );
    const pagesEQ = TestUtils.scryRenderedDOMComponentsWithClass(paginationEQ, 'page');
    expect(pagesEQ.length).toEqual(0);
  });

});
