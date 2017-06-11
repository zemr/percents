import React from 'react';
import { connect } from 'react-redux';
import ItemsList from './items-list';
import Pagination from '../pagination/pagination';

export class ItemsFilters extends React.Component {
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
    if (dataFiltered.length <= start) {
      return dataFiltered.slice(0, end - start);
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
  })
)(ItemsFilters)
