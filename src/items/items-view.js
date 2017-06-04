import React from 'react';
import data from '../data/items.json';
import ItemsList from './items-list';

const ItemsView = () => (
  <div>
    <ItemsList items={data} />
  </div>
);

export default ItemsView