const SET = 'slider/SET';

export const setSliderValues = (slider, max, min) => ({
  type: SET+slider, max, min
});

const initialState = {
  max1: 0,
  min1: 0,
  max2: 0,
  min2: 0,
  max3: 0,
  min3: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET+1:
      return {
        ...state,
        max1: action.max,
        min1: action.min
      };
    case SET+2:
      return {
        ...state,
        max2: action.max,
        min2: action.min
      };
    case SET+3:
      return {
        ...state,
        max3: action.max,
        min3: action.min
      };
    default:
      return state
  }
}
