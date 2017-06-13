import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(event) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    let posX = clientX - this.props.left;
    if (posX < 0) posX = 0;
    if (posX > this.props.width) posX = this.props.width;
    this.props.onMouseDown(posX);
  }

  calculateValues(base, shift) {
    let value = Math.round(base / this.props.width * 10) * 10;
    if (shift) { value -= shift }
    return value + '%';
  }

  render() {
    const { width, minValue, maxValue, biggerValue, smallerValue, number } = this.props;

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

        <div className="slider-bars">
          <div className="slider-bar bottom transform" style={{width: width / 10 * 11}} onMouseDown={this.handleMouseDown}>
            <div className="slider-bar" id={"bar" + number} style={{width: width, left: width / 10 / 2 + 'px'}} >
              <div className="slider-bar active transform"
                 style={{
                   left: this.calculateValues(smallerValue),
                   right: this.calculateValues(width - biggerValue, 10)
                 }}>
              </div>
            </div>
          </div>
        </div>

        <div className="slider-labels-bottom">
         <span className="slider-label max">{maxValue}</span>
         <span className="slider-label min">{minValue}</span>
        </div>
      </div>
    );
  }
}

export default Slider
