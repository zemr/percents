import React from 'react';
import data from './data/items.json';
import { connect } from 'react-redux';
import Items from './items/items-filters';
import Slider from './slider/slider-view';
import './app.css';

const tasks = [], repairs = [], efficiency = [];

class App extends React.Component {
  componentWillMount() {
    for (let i = 0; i < data.length; i++) {
      tasks.push(data[i].tasks);
      repairs.push(data[i].repairs);
      efficiency.push(data[i].efficiency);
    }
  }

  render() {
    const { page } = this.props;

    return (
      <div className="app">
        <Slider width={250} minValue={Math.min(...tasks)} maxValue={Math.max(...tasks)} number={1} />
        <Slider width={250} minValue={Math.min(...repairs)} maxValue={Math.max(...repairs)} number={2} />
        <Slider width={250} minValue={Math.min(...efficiency)} maxValue={Math.max(...efficiency)} number={3} />
        <Items data={data} start={page.start} end={page.end} />
      </div>
    );
  }
}

export default connect(
  state => ({
    page: state.pagination
  })
)(App)