import React from 'react';
import { connect } from 'react-redux';
import { setPage } from './pagination-reducer';
import './pagination.css';

const Pagination = ({setPage, count, perPage}) => {
  const pages = [];

  for (let i = 0; i < count / perPage; i++) {
    pages.push(
      <div className="page" key={i} onClick={ () => setPage(perPage * i, perPage * (i + 1)) }>
        {i + 1}
      </div>
    );
  }

  return (
    <div className="pages">
      {pages}
    </div>
  );
};

export default connect(
  state => ({}),
  dispatch => ({
    setPage: (start, end) => dispatch(setPage(start, end))
  })
)(Pagination)