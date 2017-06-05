const SET = 'pagination/SET';

export const setPage = (start, end) => ({
  type: SET, start, end
});

const initialState = {
  start: 0,
  end: 5
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET:
      return {
        start: action.start,
        end: action.end
      };
    default:
      return state;
  }
}
