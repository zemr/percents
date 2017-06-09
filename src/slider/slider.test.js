import React from 'react';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import Slider from './slider';

describe('slider', () => {

  it('calculates percent values', () => {
    const slider = TestUtils.renderIntoDocument(<Slider width={100} />);
    const percent = slider.calculateValues(50);
    const percentRoundUp = slider.calculateValues(75);
    const percentRoundDown = slider.calculateValues(74);
    expect(percent).toBe('50%');
    expect(percentRoundUp).toBe('80%');
    expect(percentRoundDown).toBe('70%');
  });

  it('calls parent function', () => {
    const handleMDStub = sinon.spy();
    const slider = TestUtils.renderIntoDocument(
      <Slider
        width={250}
        onMouseDown={handleMDStub}
      />
    );
    const bar = TestUtils.findRenderedDOMComponentWithClass(slider, 'bottom');
    TestUtils.Simulate.mouseDown(bar);
    expect(handleMDStub.calledOnce).toBeTruthy();
    handleMDStub.reset();
  });

  it('calculates relative position', () => {
    const position = {touches: false, clientX: 50};
    const handleMDStub = sinon.spy();
    const slider = TestUtils.renderIntoDocument(
      <Slider
        width={250}
        left={20}
        onMouseDown={handleMDStub}
      />
    );
    const bar = TestUtils.findRenderedDOMComponentWithClass(slider, 'bottom');
    TestUtils.Simulate.mouseDown(bar, position);
    expect(handleMDStub.args[0]).toEqual([30]);
    handleMDStub.reset();
  });

});