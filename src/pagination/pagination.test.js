import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
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

  it('marks active page', () => {
    const div = document.createElement('div');
    document.documentElement.appendChild(div);
    ReactDOM.render(
      <Pagination count={15} perPage={5} setPagination={() => {}}/>, div
    );

    let activePage = document.documentElement.getElementsByClassName('page-active');
    expect(activePage.length).toBe(0);

    ReactDOM.render(
      <Pagination count={15} perPage={5} setPagination={() => {}} page={{start: 10, end: 15}}/>, div
    );

    activePage = document.documentElement.getElementsByClassName('page-active');
    expect(activePage.length).toBe(1);
    expect(activePage[0].textContent).toEqual('3');
  });

  it('sends page values on click', () => {
    const handleClickStub = sinon.spy();
    const pagination = TestUtils.renderIntoDocument(
      <Pagination count={10} perPage={5} setPagination={() => {}} setPage={handleClickStub} />
    );
    const page = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page');
    TestUtils.Simulate.click(page[1]);
    expect(handleClickStub.calledOnce).toBeTruthy();
    expect(handleClickStub.args[0]).toEqual([5, 10]);
    handleClickStub.reset();
  })

});
