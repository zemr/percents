import React from 'react';
import './items.css';

export const setStyle = (name) => {
  const str = "width: 150px, height: 150px, position: absolute, opacity: .3, backgroundImage: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='30px' width='" + name.length * 14 + "px'><text x='4' y='20' fill='gray' font-family='monospace' font-size='20px'>" + name + "</text></svg>\")";
  const pairs = str.split(', ');
  const style = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split(': ');
    style[pair[0]] = pair[1];
  }
 return style;
};

const ItemsList = ({items}) => (
  <div>
    {
      items
        .map(item => (
          <div className="avatar" key={item.id}>
            <div style={setStyle(item.name)}/>
            <img src={item.avatar} alt={item.name}/>
          </div>
        ))
    }
  </div>
);

export default ItemsList
