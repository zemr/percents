import reducer, { setSliderValues } from './slider-reducer';

describe('slider-reducer', () => {

  it('returns initial state', () => {
    expect(reducer()).toEqual(
      { max1: 0, min1: 0, max2: 0, min2: 0, max3: 0, min3: 0 }
    );
  });

  it('sets slider values', () => {
    expect(
      reducer(
        { max1: 0, min1: 0, max2: 0, min2: 0, max3: 0, min3: 0 },
        setSliderValues(1, 100, 10)
      )
    ).toEqual(
      reducer(
        { max1: 100, min1: 10, max2: 0, min2: 0, max3: 0, min3: 0 }
      )
    );

    expect(
      reducer(
        { max1: 0, min1: 0, max2: 0, min2: 0, max3: 0, min3: 0 },
        setSliderValues(2, 8, 1)
      )
    ).toEqual(
      reducer(
        { max1: 0, min1: 0, max2: 8, min2: 1, max3: 0, min3: 0 }
      )
    );

    expect(
      reducer(
        { max1: 40, min1: 10, max2: 9, min2: 3, max3: 200, min3: 100 },
        setSliderValues(3, 200, 100)
      )
    ).toEqual(
      reducer(
        { max1: 40, min1: 10, max2: 9, min2: 3, max3: 200, min3: 100 }
      )
    );
  });

});