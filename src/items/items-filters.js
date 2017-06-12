import React from 'react';
import { connect } from 'react-redux';
import { setPage } from '../pagination/pagination-reducer';
import ItemsList from './items-list';
import Pagination from '../pagination/pagination';

let updatePage = { on: 0, start: 0, end: 0 };

export class ItemsFilters extends React.Component {
  componentDidUpdate() {
    if (updatePage.on === 1) {
      this.props.setPage(updatePage.start, updatePage.end);
      updatePage = { on: 0, start: 0, end: 0 };
    }
  }

  determineLastPage(dataLength, perPage) {
    const newIndex = perPage * (Math.ceil(dataLength / perPage) - 1);
    return { start: newIndex, end: newIndex + perPage };
  }

  filterData(data, filters) {
    return (
      data
        .filter(item =>
          item.tasks <= filters.max1
          && item.tasks >= filters.min1
        )
        .filter(item =>
          item.repairs <= filters.max2
          && item.repairs >= filters.min2
        )
        .filter(item =>
          item.efficiency <= filters.max3
          && item.efficiency >= filters.min3
        )
    );
  }

  sliceData(dataFiltered, start, end) {
    if (start !== 0 && dataFiltered.length <= start) {
      const lastPage = this.determineLastPage(dataFiltered.length, end - start);
      updatePage = { on: 1, start: lastPage.start, end: lastPage.end };
      return dataFiltered.slice(lastPage.start, lastPage.end);
    } else {
      return dataFiltered.slice(start, end);
    }
  }

  render() {
    const { data, start, end, filters } = this.props;
    let items, content;

    if (filters) {
      const dataFiltered = this.filterData(data, filters);
      items = this.sliceData(dataFiltered, start, end);

      content = (
        <div>
          <ItemsList items={items} />
          <Pagination count={dataFiltered.length} perPage={5} />
        </div>
      )

    } else {
      items = this.sliceData(data, start, end);

      content = (
        <div>
          <ItemsList items={items} />
          <Pagination count={data.length} perPage={5} />
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default connect(
  state => ({
    filters: state.slider
  }),
  dispatch => ({
    setPage: (start, end) => dispatch(setPage(start, end))
  })
)(ItemsFilters)
