import React from 'react';
import { connect } from 'react-redux';
import ItemsList from './items-list';
import Pagination from '../pagination/pagination';

const ItemsFilters = ({data, start, end, filters}) => {
  let items;

  if (filters) {
    const dataFiltered =
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
        );

    if (dataFiltered.length <= start) {
      items = dataFiltered.slice(0, end - start);
    } else {
      items = dataFiltered.slice(start, end);
    }

    return (
      <div>
        <ItemsList items={items} />
        <Pagination count={dataFiltered.length} perPage={5} />
      </div>
    );

  } else {
    items = data.slice(start, end);

    return (
      <div>
        <ItemsList items={items} />
        <Pagination count={data.length} perPage={5} />
      </div>
    );
  }
};

export default connect(
  state => ({
    filters: state.slider
  })
)(ItemsFilters)
