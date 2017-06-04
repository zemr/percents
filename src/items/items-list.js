import React from 'react';

const ItemsList = ({items}) => (
  <div>
    {
      items.map(item => (
        <span key={item.id}>{item.tasks} </span>
      ))
    }

  </div>
);

export default ItemsList