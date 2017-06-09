import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { SliderView } from './slider-view';

describe('slider-view', () => {

  const selector = sinon.stub(document, 'getElementById');
  selector.returns({
    getBoundingClientRect: () => {
      return {left: 20}
    }
  });

  let slider;
  beforeEach(() => {
     slider = TestUtils.renderIntoDocument(
      <SliderView width={250} minValue={10} maxValue={200} number={1} setSliderValues={() => {}} />
    );
  });

  afterAll(() => {
    document.getElementById.restore();
  });

  it('sets left value on mount', () => {
    expect(slider.state.left).toBe(20);
  });

  it('renders slider', () => {
    const subdiv = TestUtils.findRenderedDOMComponentWithClass(slider, 'slider');
    expect(subdiv).toBeDefined();
    const labels = TestUtils.scryRenderedDOMComponentsWithClass(slider, 'slider-label');
    expect(labels.length).toEqual(4);
  });

  it('delivers min/max values', () => {
    const maxValue = TestUtils.findRenderedDOMComponentWithClass(slider, 'max');
    const minValue = TestUtils.findRenderedDOMComponentWithClass(slider, 'min');
    expect(maxValue.textContent).toEqual('200');
    expect(minValue.textContent).toEqual('10');
  });

  it('calculates range values', () => {
    const value = slider.calculateRangeValues(125);
    expect(value).toBe(105);
  });

});


describe('slider-view (onMouseDown)', () => {

  const div = document.createElement('div');
  document.documentElement.appendChild(div);
  const instance = ReactDOM.render(<SliderView width={100} minValue={0} maxValue={100} setSliderValues={() => {}} />, div);

  it('updates bigger value', () => {
    instance.onMouseDown(20);
    expect(instance.state.biggerValue).toBe(80);
    expect(instance.state.smallerValue).toBe(0);
  });

  it('updates smaller value', () => {
    instance.onMouseDown(70);
    expect(instance.state.smallerValue).toBe(30);
    expect(instance.state.biggerValue).toBe(80);
  });

  it('doesn\'t update after small changes', () => {
    instance.onMouseDown(95);
    instance.onMouseDown(86);
    expect(instance.state.smallerValue).toBe(5);
    instance.onMouseDown(24);
    expect(instance.state.biggerValue).toBe(80);
  });

});
