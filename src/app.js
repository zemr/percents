import React from 'react';
import ItemsView from './items/items-view';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ItemsView />
      </div>
    );
  }
}

export default App;
