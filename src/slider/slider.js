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
    const { width, minValue, maxValue, biggerValue, smallerValue } = this.props;

    return (
      <div className="slider" style={{width: width}}>
        <div className="slider-labels">
            <span className="slider-label start"
                  style={{left: Math.round((width - biggerValue) / width * 10) * 10 + '%'}}>
              {Math.round(biggerValue / width * 10) * 10 + '%'}
            </span>
          <span className="slider-label end"
                style={{right: Math.round(smallerValue / width * 10) * 10 + '%'}}>
            {Math.round(smallerValue / width * 10) * 10 + '%'}
          </span>
        </div>

        <div className="slider-bars" id="bar">
          <div className="slider-bar bottom" onMouseDown={this.handleMouseDown}>
            <div className="slider-bar active"
                 style={{
                   left: Math.round(smallerValue / width * 10) * 10 + '%',
                   right: Math.round((width - biggerValue) / width * 10) * 10 + '%'
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
