import React from 'react';
import data from '../data/items.json';
import { connect } from 'react-redux';
import ItemsList from './items-list';
import Pagination from '../pagination/pagination';
import Slider from '../slider/slider-view';

const ItemsView = ({page}) => (
  <div>
    <Slider width={250} minValue={0} maxValue={200} number={1} />
    <ItemsList items={data} start={page.start} end={page.end} />
    <Pagination count={data.length} perPage={5} />
  </div>
);

export default connect(
  state => ({
    page: state.pagination
  })
)(ItemsView)