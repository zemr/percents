import React from 'react';
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

});

