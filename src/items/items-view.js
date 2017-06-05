import React from 'react';
import data from '../data/items.json';
import { connect } from 'react-redux';
import ItemsList from './items-list';
import Pagination from '../pagination/pagination';

const ItemsView = ({page}) => (
  <div>
    <ItemsList items={data} start={page.start} end={page.end} />
    <Pagination count={data.length} perPage={5} />
  </div>
);

export default connect(
  state => ({
    page: state.pagination
  })
)(ItemsView)