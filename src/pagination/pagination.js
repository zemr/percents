import React from 'react';
import { connect } from 'react-redux';
import { setPagination, setPage } from './pagination-reducer';
import './pagination.css';

export class Pagination extends React.Component {
  componentWillMount() {
    this.props.setPagination(this.props.perPage);
  }

  componentDidUpdate() {
    this.setActivePage();
  }

  setActivePage() {
    const pages = document.getElementsByClassName('page');
    if (pages) {
      for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove('page-active');
        if (this.props.perPage * i === this.props.page.start) {
          pages[i].classList.add('page-active');
        }
      }
    }
  }

  render() {
    const {setPage, count, perPage} = this.props;
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
        {count - perPage <= 0 ? null : pages}
      </div>
    );
  }
}

export default connect(
  state => ({
    page: state.pagination
  }),
  dispatch => ({
    setPagination: (perPage) => dispatch(setPagination(perPage)),
    setPage: (start, end) => dispatch(setPage(start, end))
  })
)(Pagination)