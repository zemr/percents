import React from 'react';
import Slider from './slider';
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPosition);
  }

  setPosition() {
    let rect = document.getElementById('bar').getBoundingClientRect();
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
        />
      </div>
    );
  }
}

export default SliderView
