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

  it('calculates shifted percent values', () => {
    const slider = TestUtils.renderIntoDocument(<Slider width={100} />);
    const percent = slider.calculateValues(40, 10);
    expect(percent).toBe('30%');
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
    const position = { clientX: 50 };
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

  it('calculates relative position on touch devices', () => {
    const MDStub = sinon.spy();
    const slider = TestUtils.renderIntoDocument(<Slider width={250} left={20} onMouseDown={MDStub} />);
    slider.handleMouseDown({ touches: [{clientX: 60}] });
    expect(MDStub.args[0]).toEqual([40]);
    MDStub.reset();
  });

  it('returns relative position within a range', () => {
    const MDStub = sinon.spy();
    const slider = TestUtils.renderIntoDocument(<Slider width={200} left={10} onMouseDown={MDStub} />);
    slider.handleMouseDown({ clientX: 5 });
    expect(MDStub.args[0]).toEqual([0]);
    slider.handleMouseDown({ clientX: 215 });
    expect(MDStub.args[1]).toEqual([200]);
    MDStub.reset();
  });

});