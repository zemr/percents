const DEFINE = 'pagination/DEFINE';
const SET = 'pagination/SET';

export const setPagination = perPage => ({
  type: DEFINE, perPage
});

export const setPage = (start, end) => ({
  type: SET, start, end
});

const initialState = {
  start: 0,
  end: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DEFINE:
      return {
        start: initialState.start,
        end: action.perPage
      };
    case SET:
      return {
        start: action.start,
        end: action.end
      };
    default:
      return state;
  }
}
