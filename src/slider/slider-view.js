import React from 'react';
import { connect } from 'react-redux';
import Slider from './slider';
import { setSliderValues } from './slider-reducer';
import './slider.css';

class SliderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: this.props.width,
      left: 0,
      smallerValue: 0,
      biggerValue: this.props.width
    };

    this.setPosition = this.setPosition.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  componentDidMount() {
    this.setPosition();
    window.addEventListener('resize', this.setPosition);
  }

  componentDidUpdate() {
    this.props.setSliderValues(
      this.props.number,
      this.calculateRangeValues(this.state.biggerValue),
      this.calculateRangeValues(this.state.smallerValue)
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPosition);
  }

  setPosition() {
    let rect = document.getElementById('bar' + this.props.number).getBoundingClientRect();
    this.setState({left: rect.left});
  }

  onMouseDown(posX) {
    if ((this.state.width - this.state.smallerValue) - posX <= posX - (this.state.width - this.state.biggerValue)) {
      /* not-equal-to condition limits updates */
      if (
        Math.round(this.state.smallerValue / this.state.width * 10)
        !== Math.round((this.state.width - posX) / this.state.width * 10)
      ) {
        this.setState({smallerValue: this.state.width - posX});
      }
    } else {
      if (
        Math.round(this.state.biggerValue / this.state.width * 10)
        !== Math.round((this.state.width - posX) / this.state.width * 10)
      ) {
        this.setState({biggerValue: this.state.width - posX});
      }
    }
  }

  calculateRangeValues(base) {
    return (
      (this.props.maxValue - this.props.minValue)
      * (Math.round((base / this.state.width) * 10) / 10)
      + this.props.minValue
    );
  }

  render() {
    return (
      <div>
        <Slider
          width={this.state.width}
          left={this.state.left}
          minValue={this.props.minValue}
          maxValue={this.props.maxValue}
          smallerValue={this.state.smallerValue}
          biggerValue={this.state.biggerValue}
          onMouseDown={this.onMouseDown}
          number={this.props.number}
        />
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    setSliderValues: (slider, max, min) =>  dispatch(setSliderValues(slider, max, min))
  })
)(SliderView)
