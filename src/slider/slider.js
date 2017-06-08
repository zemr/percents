import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(event) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const posX = clientX - this.props.left;
    this.props.onMouseDown(posX);
  }

  calculateValues(base) {
    const value = Math.round(base / this.props.width * 10) * 10;
    return value + '%';
  }

  render() {
    const { width, minValue, maxValue, biggerValue, smallerValue } = this.props;

    return (
      <div className="slider" style={{width: width}}>
        <div className="slider-labels">
          <span className="slider-label start" style={{left: this.calculateValues(width - biggerValue)}}>
            {this.calculateValues(biggerValue)}
          </span>
          <span className="slider-label end" style={{right: this.calculateValues(smallerValue)}}>
            {this.calculateValues(smallerValue)}
          </span>
        </div>

        <div className="slider-bars" id="bar">
          <div className="slider-bar bottom" onMouseDown={this.handleMouseDown}>
            <div className="slider-bar active"
                 style={{
                   left: this.calculateValues(smallerValue),
                   right: this.calculateValues(width - biggerValue)
                 }}>
            </div>
          </div>
        </div>

        <span className="slider-label max">{maxValue}</span>
        <span className="slider-label min">{minValue}</span>
      </div>
    );
  }
}

export default Slider
