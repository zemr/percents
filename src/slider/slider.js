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

  render() {
    const {
      width, minValue, maxValue, biggerValue, smallerValue,
      biggerValuePosition, smallerValuePosition
    } = this.props;

    return (
      <div className="slider" style={{width: width}}>
        <div className="slider-labels">
            <span className="slider-label start" style={{left: biggerValuePosition + 'px'}}>
            {Math.round((biggerValue / width) * 100) + '%'}
            </span>
          <span className="slider-label end" style={{left: smallerValuePosition + 'px'}}>
            {Math.round((smallerValue / width) * 100) + '%'}
            </span>
        </div>

        <div className="slider-labels">
            <span className="slider-label start" style={{left: biggerValuePosition + 'px'}}>
              {Math.round((maxValue - minValue) * (biggerValue / width)) + minValue}
            </span>
          <span className="slider-label end" style={{left: smallerValuePosition + 'px'}}>
              {Math.round((maxValue - minValue) * (smallerValue / width)) + minValue}
            </span>
        </div>

        <div className="slider-bars" id="bar">
          <div className="slider-bar bottom" onMouseDown={this.handleMouseDown}>
            <div className="slider-bar active"
                 style={{
                   left: ((smallerValue / width) * 100) + '%',
                   width: (((biggerValue - smallerValue) / width) * 100) + '%'
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
